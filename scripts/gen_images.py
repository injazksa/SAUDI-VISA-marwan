"""Regenerate on-topic imagery — each image directly represents its section title."""
import asyncio, os, base64, sys
from dotenv import load_dotenv

sys.path.insert(0, "/app/backend")
load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

MODEL = "gemini-3.1-flash-image-preview"
OUT = "/app/frontend/public/gen"
os.makedirs(OUT, exist_ok=True)

STYLE = (
    " Editorial cinematic photograph in deep emerald green (#006C35), ivory white and warm gold (#C5A059) palette. "
    "Studio lighting, shallow depth of field, magazine-quality composition, empty negative space on the right side for RTL text overlay. "
    "STRICT RULES: absolutely NO text, NO letters, NO words, NO writing, NO script, NO logos, NO watermarks, NO numbers anywhere in the image. "
    "NO wax seals, NO envelopes tied with ribbon, NO woman's hand, NO doors, NO empty corridors. Focus on the described subject only."
)

PROMPTS = {
    # 1) Office scene with Jordanian + Saudi flags — represents the office / accreditation
    "hero-1-office": (
        "A cinematic editorial photograph of an elegant modern professional office interior. In the foreground a polished dark wood desk with organized paperwork, a fountain pen, and a closed dark passport. "
        "In the background stand two small tabletop flag poles: one flag is a SOLID EMERALD GREEN flag (Saudi Arabian style, no writing or emblem at all — completely plain green fabric), the other flag has three horizontal stripes black white and green with a red triangle at the pole side (Jordanian style, plain fabric with no writing). "
        "Warm afternoon daylight from a window on the left, soft rim light. Empty negative space on the right." + STYLE
    ),

    # 2) Work-visa: open passport with a large circular INK stamp impression (no wax)
    "hero-2-work-visa": (
        "Extreme close-up macro editorial photograph of an OPEN passport lying flat on an ivory desk. On the visible passport page there is a large circular INK stamp impression in emerald green — a blurred official-looking round ornamental emblem without any readable letters or script (only abstract geometric flourishes). A fine gold-tipped fountain pen rests next to the passport. Cinematic warm rim light, shallow depth of field, luxurious feel. Empty negative space on the right." + STYLE
    ),

    # 3) Attestations: official-looking blank certificate + round rubber ink stamp
    "hero-3-attestation": (
        "Editorial top-down still-life photograph of an official-looking ivory paper CERTIFICATE with an elegant emerald green ornamental border pattern (leaves, filigree scrollwork) and two decorative gold rosette medallions in the top corners. The body of the certificate is intentionally BLANK — no readable letters or script whatsoever, only a few faint decorative horizontal lines and floral flourishes. Next to it rests a round wooden-and-brass RUBBER INK STAMP (traditional round office stamp with a handle) and a small emerald-green ink pad. Warm cinematic light. Empty negative space on the right." + STYLE
    ),

    # Service pages
    "service-visa": (
        "Editorial close-up photograph of an open passport with a clear circular INK stamp impression in emerald green on the visible page (no readable letters, only abstract blurred stamp pattern with faint geometric flourishes). Ivory-toned pages, elegant minimal composition." + STYLE
    ),
    "service-attestation": (
        "Editorial still-life close-up of an official-looking ivory certificate paper with an elegant emerald green ornamental frame and a round metal-and-wood RUBBER INK STAMP standing beside it. The certificate is intentionally blank — no readable text or letters, only elegant ornamental patterns and faint horizontal decorative lines." + STYLE
    ),
    "service-qvp": (
        "Editorial close-up still-life of a small elegant professional CREDENTIAL CARD in emerald green with gold trim, resting on ivory paper. The card carries an abstract embossed gold badge emblem (no readable letters or words). Beside it, a small gold laurel-like ornament. Cinematic studio light." + STYLE
    ),
    "service-corporate": (
        "Editorial photograph of an elegant modern executive office desk with organized stacks of ivory business folders bound with emerald-green ribbons, a fountain pen, a small emerald-green coffee cup, and a clean brass paperweight. No people. Warm daylight from the side. Clean, professional." + STYLE
    ),
    "trust-1": (
        "Editorial close-up photograph of a round wooden-and-brass rubber ink stamp being firmly pressed onto an ivory certificate paper, leaving a fresh circular emerald-green INK impression (blurred abstract stamp pattern, no readable letters). Overhead lighting, tactile textures." + STYLE
    ),

    # Blog thumbnail for authorization/power-of-attorney
    "blog-authorization": (
        "Editorial close-up still-life of a signed ivory document on a dark emerald surface. A gold-tipped fountain pen rests on the paper, and next to it a round rubber INK STAMP and a modern minimalist tablet-like slab with a blank matte screen (representing digital authorization). No readable text or letters anywhere." + STYLE
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
    print(f"[{name}] saved ({len(data)//1024} KB)")
    return path


async def main():
    for name, prompt in PROMPTS.items():
        try:
            await gen_one(name, prompt)
        except Exception as e:
            print(f"[{name}] ERROR: {e}")


if __name__ == "__main__":
    asyncio.run(main())
