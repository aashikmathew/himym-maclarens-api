# MacLaren's Pub: How I Met Your Mother API 🍻

## Why I Created This
This project is a tribute to my love for *How I Met Your Mother*. The show has brought me countless laughs, life lessons, and legendary moments. Building this API and fun web app is my way of saying thank you to the creators, cast, and fellow fans—my gratitude for all the joy and inspiration the show has given me. I hope this project helps you relive some of those iconic moments and brings a smile to your face, just as the show did for me!

## Tech Stack
- **Backend:** Python, FastAPI
- **Frontend:** HTML, CSS (glassmorphism, responsive), JavaScript (vanilla)
- **Serving:** Uvicorn
- **Static Assets:** Custom images, favicon, and audio

## Features
- Get random fun facts about the show
- Get HIMYM-themed jokes
- Get memorable quotes from the series
- Get Barney's legendary pickup lines
- Animated, interactive, and modern UI
- Play the HIMYM theme song with a lively music bar
- "Legen—wait for it—dary!" animated toast for pickup lines

## Setup
1. Clone this repository
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API:
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000`

## API Endpoints
- `GET /`: Welcome message and available endpoints
- `GET /fun-fact`: Get a random fun fact
- `GET /joke`: Get a random joke
- `GET /quote`: Get a random interesting quote
- `GET /pickup-line`: Get a random Barney pickup line

## Interactive Documentation
Once the API is running, you can visit:
- `http://localhost:8000/docs` for the Swagger UI documentation
- `http://localhost:8000/redoc` for the ReDoc documentation

## Example Usage
```bash
# Get a random fun fact
curl http://localhost:8000/fun-fact

# Get a random joke
curl http://localhost:8000/joke

# Get a random quote
curl http://localhost:8000/quote

# Get a random pickup line
curl http://localhost:8000/pickup-line
```

## Frontend
- Open your browser and go to `http://localhost:8000/static/index.html`
- Enjoy the interactive, animated, and themed UI!

## Contributing
Feel free to add more fun facts, jokes, quotes, or pickup lines by editing the `fun_data.py` file!

## License
MIT License - Feel free to use this project for any purpose! 