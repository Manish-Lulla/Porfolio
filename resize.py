"""
Batch resize images to 16:9 aspect ratio.
- Crops images smartly from center (no stretching/distortion)
- Outputs optimized PNG/JPG files
- Preserves originals (saves to /resized folder)
"""

from PIL import Image
import os

# ===== CONFIG =====
INPUT_FOLDER = "public/projects"
OUTPUT_FOLDER = "public/projects/resized"
TARGET_WIDTH = 1280
TARGET_HEIGHT = 720
QUALITY = 85
SUPPORTED_FORMATS = (".png", ".jpg", ".jpeg", ".webp")
# ==================


def resize_to_aspect_ratio(image_path, output_path, target_w, target_h):
    """Resize and center-crop image to exact target dimensions."""
    img = Image.open(image_path)
    
    if img.mode == "RGBA" and output_path.lower().endswith((".jpg", ".jpeg")):
        background = Image.new("RGB", img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3])
        img = background
    
    original_w, original_h = img.size
    target_ratio = target_w / target_h
    original_ratio = original_w / original_h
    
    if original_ratio > target_ratio:
        new_width = int(original_h * target_ratio)
        left = (original_w - new_width) // 2
        img = img.crop((left, 0, left + new_width, original_h))
    else:
        new_height = int(original_w / target_ratio)
        top = (original_h - new_height) // 2
        img = img.crop((0, top, original_w, top + new_height))
    
    img = img.resize((target_w, target_h), Image.LANCZOS)
    
    if output_path.lower().endswith((".jpg", ".jpeg")):
        img.save(output_path, "JPEG", quality=QUALITY, optimize=True)
    else:
        img.save(output_path, "PNG", optimize=True)
    
    return img.size


def main():
    print(f"📂 Looking in: {os.path.abspath(INPUT_FOLDER)}\n")
    
    if not os.path.exists(INPUT_FOLDER):
        print(f"❌ Folder not found: {INPUT_FOLDER}")
        print(f"   Create it with: mkdir public\\projects")
        return
    
    # Show ALL files in the folder for debugging
    all_items = os.listdir(INPUT_FOLDER)
    print(f"📋 All items in folder ({len(all_items)}):")
    for item in all_items:
        full_path = os.path.join(INPUT_FOLDER, item)
        is_file = os.path.isfile(full_path)
        marker = "📄" if is_file else "📁"
        print(f"   {marker} {item}")
    print()
    
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    
    files = [f for f in os.listdir(INPUT_FOLDER) 
             if f.lower().endswith(SUPPORTED_FORMATS) 
             and os.path.isfile(os.path.join(INPUT_FOLDER, f))]
    
    if not files:
        print(f"❌ No images matching {SUPPORTED_FORMATS} found in {INPUT_FOLDER}")
        return
    
    print(f"🖼️  Found {len(files)} image(s) to process: {files}")
    print(f"📐 Target: {TARGET_WIDTH}x{TARGET_HEIGHT} (16:9)\n")
    
    for filename in files:
        input_path = os.path.join(INPUT_FOLDER, filename)
        output_path = os.path.join(OUTPUT_FOLDER, filename)
        
        try:
            original_size_kb = os.path.getsize(input_path) / 1024
            original_dims = Image.open(input_path).size
            
            new_dims = resize_to_aspect_ratio(
                input_path, output_path, TARGET_WIDTH, TARGET_HEIGHT
            )
            
            new_size_kb = os.path.getsize(output_path) / 1024
            savings = ((original_size_kb - new_size_kb) / original_size_kb) * 100
            
            print(f"✅ {filename}")
            print(f"   {original_dims[0]}x{original_dims[1]} ({original_size_kb:.1f} KB)  →  "
                  f"{new_dims[0]}x{new_dims[1]} ({new_size_kb:.1f} KB)  "
                  f"[{savings:+.1f}%]\n")
        except Exception as e:
            print(f"❌ Failed to process {filename}: {e}\n")
    
    print(f"🎉 Done! Resized images saved to: {OUTPUT_FOLDER}")
    print(f"💡 If they look good, replace originals with these.")


if __name__ == "__main__":
    main()