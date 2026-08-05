"""One-off script — generate on-brand editorial imagery for the site (Nano Banana)."""
import asyncio, os, base64, sys
from dotenv import load_dotenv

sys.path.insert(0, "/app/backend")
load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

MODEL = "gemini-3.1-flash-image-preview"
OUT = "/app/frontend/public/gen"
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "Editorial, minimalist, cinematic photograph. Deep Saudi emerald green (#006C35) and pure white palette with subtle gold (#C5A059) highlights. "
    "Studio lighting, shallow depth of field, professional, premium magazine aesthetic. High contrast, muted background. "
    "Absolutely NO text, NO letters, NO words, NO logos, NO watermarks, NO writing of any kind in the image. Composition rule of thirds, empty negative space for text overlay on the right side."
)

PROMPTS = {
    "hero-1-visa": (
        "A closed dark emerald-green leather passport lying at an angle on a matte marble surface next to a fine gold pen. "
        "Soft warm rim light, cinematic mood, editorial composition. Depth of field. Passport cover is smooth, no readable text or emblem. " + STYLE
    ),
    "hero-2-attestation": (
        "An extreme close-up of a matte green wax seal freshly pressed onto a folded piece of ivory cotton paper tied with a slim gold ribbon. "
        "The seal is smooth, no letters or logos visible. Studio side lighting, tactile textures. " + STYLE
    ),
    "hero-3-authorization": (
        "A minimalist top-down composition of neatly stacked crisp ivory paper folders on a deep emerald desk, a single gold clip resting on top, "
        "soft daylight from the side. No text visible on the folders. Clean editorial still life. " + STYLE
    ),
    "service-visa": (
        "Editorial still life: a dark green leather passport laid flat on emerald marble with a soft gold accent stripe reflecting light. "
        "No text, no emblem. Premium, minimalist, magazine style. " + STYLE
    ),
    "service-attestation": (
        "Editorial still life: a heavy round embossing seal tool made of dark wood and brass resting beside a blank ivory certificate paper. "
        "No text or letters. Studio lighting, luxurious feel. " + STYLE
    ),
    "service-qvp": (
        "Editorial still life: a single gold laurel-like abstract badge shape resting on a clean ivory paper, subtle green accent line. "
        "No letters or numbers. Premium, minimalist. " + STYLE
    ),
    "service-corporate": (
        "Editorial architectural photograph: a modern minimalist office corridor with deep emerald green walls and gold trim, warm daylight, empty space, no people, no signage or text. " + STYLE
    ),
    "trust-1": (
        "Extreme close-up of a hand (out of focus in background) placing a matte gold-and-emerald round seal onto a stack of ivory papers. "
        "No visible text or letters. Cinematic warm light, shallow depth of field. " + STYLE
    ),
}


async def gen_one(name: str, prompt: str):
    key = os.getenv("EMERGENT_LLM_KEY")
    if not key:
        raise RuntimeError("EMERGENT_LLM_KEY missing")
    chat = LlmChat(api_key=key, session_id=f"img-{name}", system_message="You generate premium editorial images.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] NO IMAGE. text head:", (text or "")[:120])
        return None
    img = images[0]
    data = base64.b64decode(img["data"])
    path = os.path.join(OUT, f"{name}.png")
    with open(path, "wb") as f:
        f.write(data)
    print(f"[{name}] saved -> {path} ({len(data)//1024} KB)")
    return path


async def main():
    for name, prompt in PROMPTS.items():
        try:
            await gen_one(name, prompt)
        except Exception as e:
            print(f"[{name}] ERROR: {e}")


if __name__ == "__main__":
    asyncio.run(main())
