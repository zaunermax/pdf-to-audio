import fs from 'fs';
import { OpenAI } from 'openai';
import pdfParse from 'pdf-parse';
import ffmpeg from 'fluent-ffmpeg';
import 'dotenv/config'

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

async function convertPdfToAudio(pdfPath: string, outputPath: string) {
	const dataBuffer = fs.readFileSync(pdfPath);
	const text = await pdfParse(dataBuffer);

	const chunks = chunkText(text.text);

	const audioChunkFiles = await Promise.all(chunks.map(async (chunk, index) => {
		const mp3 = await client.audio.speech.create({
			model: "tts-1",
			voice: 'alloy',
			input: chunk
		});

		const audioPath = `chunk-${index}.mp3`;
		const buffer = Buffer.from(await mp3.arrayBuffer());

		fs.writeFileSync(audioPath, buffer);

		return audioPath;
	}));

	const combinedAudioPath = 'combined-audio.mp3';

	const merge = ffmpeg();

	audioChunkFiles.forEach(file => {
		merge.input(file);
	});

	merge
		.on('error', function(err) {
			console.log('An error occurred: ' + err.message);
		})
		.on('end', function() {
			console.log('Merging complete, file saved as ' + combinedAudioPath);
			audioChunkFiles.forEach(fs.unlinkSync);
		})
		.mergeToFile(combinedAudioPath, '/tmp/');
}

function chunkText(text: string, chunkSize: number = 4096): string[] {
	const chunks: string[] = [];

	for (let i = 0; i < text.length; i += chunkSize) {
		chunks.push(text.substring(i, i + chunkSize));
	}

	return chunks;
}

const args = process.argv.slice(2);

if (args.length !== 2) {
	console.error('Usage: node [script] [inputPdfPath] [outputAudioPath]');
	process.exit(1);
}

const [inputPdfPath, outputAudioPath] = args;

convertPdfToAudio(inputPdfPath, outputAudioPath);
