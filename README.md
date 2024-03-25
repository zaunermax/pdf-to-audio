<p align="center">
  <img src="./docs/title-image.webp" alt="PDF to Audiobook Converter">
</p>

<h1 align="center">PDF to Audiobook Converter</h1>

This project provides a script that converts PDF documents into audiobooks using OpenAI's text-to-speech capabilities. It splits the PDF text into chunks, generates audio files for each chunk, and then merges these into a single audiobook file.

I needed a quick tool to convert my PDF to some audio file.

## Requirements

- bun
- Access to OpenAI API

## Installation

To install the required dependencies, run:

```bash
bun install
```

## Usage

Execute the script with bun, providing the path to the input PDF and the desired output path for the audiobook:

```bash
bun index.ts [inputPdfPath] [outputAudioPath]
```

Ensure you have set the `OPENAI_API_KEY` in your `.env` file to use the OpenAI API.

## Note

This script utilizes fluent-ffmpeg for audio processing (merging chunk audio files to one file), pdf-parse for reading PDF content, and the OpenAI SDK for generating speech.
