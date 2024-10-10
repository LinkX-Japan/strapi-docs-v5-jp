from openai import OpenAI
from dotenv import load_dotenv
import os
import re

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("The OPENAI_API_KEY environment variable is not set.")
client = OpenAI(api_key=api_key)

# Function to read a markdown file
def read_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

# Function to split text while preserving code blocks and markdown syntax
def split_text(text, max_chunk_size=3000):
    """
    Splits the text into chunks without breaking code blocks or markdown syntax.

    Parameters:
    text (str): The text to split.
    max_chunk_size (int): Maximum size of each chunk.

    Returns:
    list: A list of text chunks.
    """
    # Split by double newlines to get paragraphs
    paragraphs = text.split('\n\n')
    chunks = []
    current_chunk = ''

    for paragraph in paragraphs:
        paragraph += '\n\n'  # Add back the double newline
        if len(current_chunk) + len(paragraph) <= max_chunk_size:
            current_chunk += paragraph
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            if len(paragraph) <= max_chunk_size:
                current_chunk = paragraph
            else:
                # Split long paragraphs further
                sentences = re.split('(?<=[.!?]) +', paragraph)
                for sentence in sentences:
                    sentence += ' '
                    if len(current_chunk) + len(sentence) <= max_chunk_size:
                        current_chunk += sentence
                    else:
                        if current_chunk:
                            chunks.append(current_chunk.strip())
                        current_chunk = sentence
    if current_chunk:
        chunks.append(current_chunk.strip())
    return chunks

# Function to handle chunked translation
def translate_text_in_chunks(text, target_language="ja", model="gpt-4", chunk_size=3000):
    """
    Translate large text in chunks using OpenAI API.

    Parameters:
    text (str): The text to translate.
    target_language (str): Target language for translation.
    model (str): The model to use for translation (default is gpt-4).
    chunk_size (int): Maximum size of each chunk for the API call.

    Returns:
    str: The translated text.
    """
    translated_text = ""
    chunks = split_text(text, max_chunk_size=chunk_size)

    for chunk in chunks:
        messages = [
            {"role": "system", "content": f"You are a professional translator proficient in translating English text to {target_language}. Do not translate code blocks, snippets, or any markdown syntax. Preserve all formatting, code, and special characters exactly as they are."},
            {"role": "user", "content": chunk}
        ]
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                max_tokens=2048,
                temperature=0.5
            )
            translation = response.choices[0].message.content.strip()
            translated_text += translation + "\n\n"
        except Exception as e:
            print(f"Error occurred during translation: {e}")
            break
    return translated_text.strip()

# Function to write the translated content to a markdown file
def write_markdown_file(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Function to translate all markdown files in a directory
def translate_markdown_files(input_dir, output_dir, target_language="ja"):
    for file_name in os.listdir(input_dir):
        if file_name.endswith(".md"):
            input_file = os.path.join(input_dir, file_name)
            output_file = os.path.join(output_dir, file_name)

            print(f"Translating {file_name}...")
            content = read_markdown_file(input_file)
            translated_content = translate_text_in_chunks(content, target_language=target_language)
            write_markdown_file(output_file, translated_content)
            print(f"Translated {file_name} saved to {output_file}")

# Example usage
input_directory = './docs/dev-docs/api/'  # Directory containing markdown files to translate
output_directory = './translated-docs-md'  # Directory to save translated markdown files

# Create output directory if it doesn't exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Translate all markdown files in the input directory
translate_markdown_files(input_directory, output_directory)
