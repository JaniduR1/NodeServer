from PIL import Image
from torchvision import transforms

def prepImage(image_loc):
    image = Image.open(image_loc).convert("L")
    width, height = image.size
    new_width = int(height * (50 / 75))

    if new_width > width:
        new_height = int(width * (75 / 50))
        resized_image = image.resize((width, new_height))
        pad_top = int((new_height - new_width) // 2)
        pad_bottom = new_height - new_width - pad_top
        padded_image = Image.new("L", (width, new_height), color=0)
        padded_image.paste(resized_image, (0, pad_top))
    else:
        new_height = height
        resized_image = image.resize((new_width, height))
        pad_left = int((new_width - new_height) // 2)
        pad_right = new_width - new_height - pad_left
        padded_image = Image.new("L", (new_width, height), color=0)
        padded_image.paste(resized_image, (pad_left, 0))

    image_tensor = transforms.ToTensor()(padded_image).float()
    image_tensor = transforms.Normalize((0.5,), (0.5,))(image_tensor)

    return image_tensor