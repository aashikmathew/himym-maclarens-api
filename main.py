from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import random
from typing import List, Dict
from fun_data import fun_facts, jokes, interesting_quotes, pickup_lines

app = FastAPI(
    title="Fun Facts & Jokes API",
    description="A fun API that serves random fun facts, jokes, and interesting quotes!",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Fun Facts & Jokes API! 🎉",
        "endpoints": {
            "/fun-fact": "Get a random fun fact",
            "/joke": "Get a random joke",
            "/quote": "Get a random interesting quote",
            "/random": "Get a random fun item of any type",
            "/pickup-line": "Get a random pickup line"
        }
    }

@app.get("/fun-fact")
async def get_fun_fact():
    return {"fun_fact": random.choice(fun_facts)}

@app.get("/joke")
async def get_joke():
    return {"joke": random.choice(jokes)}

@app.get("/quote")
async def get_quote():
    return {"quote": random.choice(interesting_quotes)}

@app.get("/random")
async def get_random():
    all_items = fun_facts + jokes + interesting_quotes
    random_item = random.choice(all_items)
    item_type = "fun_fact" if random_item in fun_facts else "joke" if random_item in jokes else "quote"
    return {
        "type": item_type,
        "content": random_item
    }

@app.get("/pickup-line")
async def get_pickup_line():
    return {"pickup_line": random.choice(pickup_lines)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 