"""إعادة توليد صورة الهيرو: علم أردني بنجمة سباعية واضحة + علم سعودي بالشهادة والسيف."""
import asyncio, os, base64, sys
from dotenv import load_dotenv

sys.path.insert(0, "/app/backend")
load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

MODEL = "gemini-3.1-flash-image-preview"
OUT_PNG = "/tmp/hero-flags-new.png"

PROMPT = (
    "A cinematic editorial photograph of an elegant modern professional office interior in Amman. "
    "On a polished dark walnut wood desk stand two crossed tabletop flag poles with small brass bases, side by side, clearly visible and in focus. "
    "FLAG 1 (the national flag of Jordan): three equal horizontal stripes — black on top, white in the middle, green on the bottom — with a red isosceles triangle at the hoist side, and inside the red triangle a CLEARLY VISIBLE white seven-pointed star in its center. The seven-pointed star is the most important detail and must be sharp and obvious. "
    "FLAG 2 (the national flag of Saudi Arabia): solid emerald green fabric with the white Shahada Islamic creed written in correct, legible white Arabic Thuluth calligraphy (لا إله إلا الله محمد رسول الله) above a white horizontal saber sword pointing to the right. "
    "Both flags must be accurate, official and instantly recognizable. "
    "Background: blurred elegant office with a green upholstered chair, bookshelf, and warm afternoon daylight from a large window on the left. "
    "Deep emerald green, ivory white and warm gold palette. Magazine-quality composition, shallow depth of field, soft rim light. "
    "Empty negative space on the right side of the frame for text overlay. No people, no other text, no logos, no watermarks anywhere else in the image."
)


async def main():
    key = os.getenv("EMERGENT_LLM_KEY")
    if not key:
        raise RuntimeError("EMERGENT_LLM_KEY missing")
    chat = LlmChat(api_key=key, session_id="img-hero-flags-v2", system_message="You generate premium editorial photographs. Flag accuracy is critical.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if not images:
        print("NO IMAGE:", (text or "")[:200])
        return
    data = base64.b64decode(images[0]["data"])
    with open(OUT_PNG, "wb") as f:
        f.write(data)
    print(f"SAVED {OUT_PNG} ({len(data)//1024} KB)")

    # تحويل إلى WebP خفيف واستبدال الصورة الحالية
    from PIL import Image
    img = Image.open(OUT_PNG).convert("RGB")
    img.save("/app/frontend/public/gen/hero-1-office.webp", "WEBP", quality=82, method=6)
    print("WEBP written:", os.path.getsize("/app/frontend/public/gen/hero-1-office.webp") // 1024, "KB")


if __name__ == "__main__":
    asyncio.run(main())
