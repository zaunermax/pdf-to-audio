<p align="center">
  <img src="./docs/title-image.webp" alt="PDF to Audiobook Converter" width="300">
</p>

<h1 align="center">PDF to Audio Converter</h1>

I needed a quick tool to convert a long PDF to a single audio file so I decided to write a very simple small script to do so. Expect nothing fancy. It's just a tool you can clone, execute and profit from.

This project provides a script that converts PDF documents into audiobooks using OpenAI's text-to-speech capabilities. It splits the PDF text into chunks, generates audio files for each chunk, and then merges these into a single audiobook file.

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
