import sys
import torch
from model import Glyphnet
from PreprocessImage import prepImage

loaded_model = torch.load("C:\\Users\\janid\\OneDrive\\Documents\\Uni\\CCCU 23 24\\Final Year Project\\NodeServer\\server\\src\\checkpoint.bin")

def predict_image(image_path):
    image = prepImage(image_path)
    image_tensor = image.unsqueeze(0)
    with torch.no_grad():
        output = loaded_model(image_tensor)
        predicted_class = torch.argmax(output)
    train_labels = {"A55": 0, "Aa15": 1, "Aa26": 2, "Aa27": 3, "Aa28": 4, "D1": 5, "D10": 6, "D156": 7, "D19": 8, "D2": 9, "D21": 10, "D28": 11, "D34": 12, "D35": 13, "D36": 14, "D39": 15, "D4": 16, "D46": 17, "D52": 18, "D53": 19, "D54": 20, "D56": 21, "D58": 22, "D60": 23, "D62": 24, "E1": 25, "E17": 26, "E23": 27, "E34": 28, "E9": 29, "F12": 30, "F13": 31, "F16": 32, "F18": 33, "F21": 34, "F22": 35, "F23": 36, "F26": 37, "F29": 38, "F30": 39, "F31": 40, "F32": 41, "F34": 42, "F35": 43, "F4": 44, "F40": 45, "F9": 46, "G1": 47, "G10": 48, "G14": 49, "G17": 50, "G21": 51, "G25": 52, "G26": 53, "G29": 54, "G35": 55, "G36": 56, "G37": 57, "G39": 58, "G4": 59, "G40": 60, "G43": 61, "G5": 62, "G50": 63, "G7": 64, "H6": 65, "I10": 66, "I5": 67, "I9": 68, "L1": 69, "M1": 70, "M12": 71, "M16": 72, "M17": 73, "M18": 74, "M195": 75, "M20": 76, "M23": 77, "M26": 78, "M29": 79, "M3": 80, "M4": 81, "M40": 82, "M41": 83, "M42": 84, "M44": 85, "M8": 86, "N1": 87, "N14": 88, "N16": 89, "N17": 90, "N18": 91, "N19": 92, "N2": 93, "N24": 94, "N25": 95, "N26": 96, "N29": 97, "N30": 98, "N31": 99, "N35": 100, "N36": 101, "N37": 102, "N41": 103, "N5": 104, "O1": 105, "O11": 106, "O28": 107, "O29": 108, "O31": 109, "O34": 110, "O4": 111, "O49": 112, "O50": 113, "O51": 114, "P1": 115, "P13": 116, "P6": 117, "P8": 118, "P98": 119, "Q1": 120, "Q3": 121, "Q7": 122, "R4": 123, "R8": 124, "S24": 125, "S28": 126, "S29": 127, "S34": 128, "S42": 129, "T14": 130, "T20": 131, "T21": 132, "T22": 133, "T28": 134, "T30": 135, "U1": 136, "U15": 137, "U28": 138, "U33": 139, "U35": 140, "U7": 141, "V13": 142, "V16": 143, "V22": 144, "V24": 145, "V25": 146, "V28": 147, "V30": 148, "V31": 149, "V4": 150, "V6": 151, "V7": 152, "W11": 153, "W14": 154, "W15": 155, "W18": 156, "W19": 157, "W22": 158, "W24": 159, "W25": 160, "X1": 161, "X6": 162, "X8": 163, "Y1": 164, "Y2": 165, "Y3": 166, "Y5": 167, "Z1": 168, "Z11": 169, "Z7": 170}
    predicted_class_label = [label for label, index in train_labels.items() if index == predicted_class.item()][0]
    return predicted_class_label

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predict2.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]

    predicted_class = predict_image(image_path)
    print("Predicted class index:", predicted_class)