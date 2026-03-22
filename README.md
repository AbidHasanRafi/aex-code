![AEX Code Cover](https://raw.githubusercontent.com/AbidHasanRafi/aex-code/main/aex-code-cover.jpg)
# A E X - C O D E

AEX Code is a CLI application that functions as an advanced coding agent similar to Claude Code. It is optimized for free-tier usage via OpenRouter models and provides a clean UI with both interactive and command-based workflows. This project was developed by [Md. Abid Hasan Rafi](https://abidhasanrafi.github.io) and powered by [AI Extension](https://aiextension.org).

## Features

- **Code Generation and Explanation:** Interactive terminal sessions within your workspace.
- **File Management:** Create, review, and edit files with context-aware AI assistance.
- **Safe Shell Commands:** Execute shell commands with controlled output handling.
- **Multi-file Context Processing:** Build rich context from your codebase across multiple files.
- **Configurable Models:** Use OpenRouter API keys to select preferred models. Defaults to `qwen/qwen3-coder:free`.

## Requirements

- Node.js >= 16

## Setup and Configuration

1. Install globally:
   ```bash
   npm install -g aex-code
   ```

2. Configure your OpenRouter API key:
   ```bash
   aex-code config --set-key "sk-or-v1-..."
   ```

3. Set your preferred model (optional):
   ```bash
   aex-code config --set-model "anthropic/claude-3.5-sonnet:beta"
   ```

## Usage

### Interactive Shell

Start an interactive session with the AI agent. The session maintains context and streams responses.

```bash
aex-code chat
```

### Analyze and Edit a File

Analyze and modify local files using AI.

```bash
aex-code edit src/index.js
```

### Initialize Configuration

```bash
aex-code init
```

### Run Commands

```bash
aex-code run "npm install"
```

## Development and Contribution

The project follows a modular architecture where commands are organized under `src/commands`, making it easy to extend and maintain.

## License

MIT