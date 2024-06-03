from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import sys
import os

app = FastAPI()

class Code(BaseModel):
    code: str

@app.post("/run")
async def run_code(code: Code):
    try:
        # Write code to a temporary file
        with open("temp_code.py", "w") as file:
            file.write(code.code)

        # Execute the code
        result = subprocess.run(
            [sys.executable, "temp_code.py"], capture_output=True, text=True, check=True
        )
        return {"output": result.stdout}

    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=400, detail=e.stderr)
    finally:
        if os.path.exists("temp_code.py"):
            os.remove("temp_code.py")
            