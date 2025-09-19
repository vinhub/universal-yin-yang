#!/usr/bin/env python3
"""
Generate social media preview PNG for the Yin-Yang project
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import math
except ImportError:
    print("Please install Pillow: pip install Pillow")
    exit(1)

def create_social_preview():
    # Create image with social media friendly dimensions
    width, height = 1200, 630
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Create gradient background (approximate)
    for y in range(height):
        # Interpolate between gradient colors
        t = y / height
        r = int(26 * (1-t) + 15 * t)  # 1a -> 0f
        g = int(26 * (1-t) + 52 * t)  # 1a -> 34
        b = int(46 * (1-t) + 96 * t)  # 2e -> 60
        
        color = (r, g, b)
        draw.line([(0, y), (width, y)], fill=color)
    
    # Yin-Yang symbol parameters
    center_x, center_y = 600, 315
    radius = 150
    
    # Create a mask for the Yin-Yang shape
    # First, fill entire circle with white
    draw.ellipse([center_x - radius, center_y - radius, 
                  center_x + radius, center_y + radius], fill='white')
    
    # Create the black Yin half using a more accurate approach
    # Draw left semicircle (black)
    draw.pieslice([center_x - radius, center_y - radius, 
                   center_x + radius, center_y + radius], 
                  90, 270, fill='black')
    
    # Draw top small circle (white, to cut out from black)
    draw.ellipse([center_x - radius//2, center_y - radius, 
                  center_x + radius//2, center_y], fill='white')
    
    # Draw bottom small circle (black, to add to white area)
    draw.ellipse([center_x - radius//2, center_y, 
                  center_x + radius//2, center_y + radius], fill='black')
    
    # Draw outer circle border
    draw.ellipse([center_x - radius - 1, center_y - radius - 1, 
                  center_x + radius + 1, center_y + radius + 1], 
                 outline=(255, 255, 255, 76), width=2)
    
    # Draw Yang dot (black dot in white area)
    dot_radius = 25
    draw.ellipse([center_x - dot_radius, center_y - 75 - dot_radius,
                  center_x + dot_radius, center_y - 75 + dot_radius], fill='black')
    
    # Draw Yin dot (white dot in black area) 
    draw.ellipse([center_x - dot_radius, center_y + 75 - dot_radius,
                  center_x + dot_radius, center_y + 75 + dot_radius], fill='white')
    
    # Try to load a font, fall back to default if not available
    try:
        title_font = ImageFont.truetype("Arial.ttf", 48)
        subtitle_font = ImageFont.truetype("Arial.ttf", 24)
        bottom_font = ImageFont.truetype("Arial.ttf", 18)
    except:
        try:
            title_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 48)
            subtitle_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
            bottom_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 18)
        except:
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            bottom_font = ImageFont.load_default()
    
    # Draw title text
    title = "The Yin-Yang Model of Reality"
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    draw.text((center_x - title_width//2, 70), title, 
              fill=(255, 255, 255, 229), font=title_font)  # rgba(255, 255, 255, 0.9)
    
    # Draw subtitle
    subtitle = "An Interactive Journey Through Balance and Duality"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    draw.text((center_x - subtitle_width//2, 120), subtitle, 
              fill=(255, 140, 66, 204), font=subtitle_font)  # rgba(255, 140, 66, 0.8)
    
    # Draw bottom text
    bottom_text = "Explore the fundamental principles of complementary opposites"
    bottom_bbox = draw.textbbox((0, 0), bottom_text, font=bottom_font)
    bottom_width = bottom_bbox[2] - bottom_bbox[0]
    draw.text((center_x - bottom_width//2, 560), bottom_text, 
              fill=(255, 255, 255, 153), font=bottom_font)  # rgba(255, 255, 255, 0.6)
    
    # Save the image
    img.save('social-preview.png', 'PNG', quality=95)
    print("✅ social-preview.png generated successfully!")
    print("📐 Dimensions: 1200x630 pixels (optimal for social media)")
    
    return img

if __name__ == "__main__":
    create_social_preview()
