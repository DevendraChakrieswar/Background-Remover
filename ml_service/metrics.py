import numpy as np
from PIL import Image

def load_mask_as_array(path: str) -> np.ndarray:
    mask = Image.open(path).convert("L")
    arr = np.array(mask) > 127
    return arr.astype(np.uint8)

def compute_metrics(pred_path: str, gt_path: str) -> dict:
    pred = load_mask_as_array(pred_path)
    gt = load_mask_as_array(gt_path)

    intersection = np.logical_and(pred, gt).sum()
    union = np.logical_or(pred, gt).sum()
    iou = intersection / union if union > 0 else 0.0

    dice = (2 * intersection) / (pred.sum() + gt.sum()) if (pred.sum() + gt.sum()) > 0 else 0.0

    tp = intersection
    fp = pred.sum() - tp
    fn = gt.sum() - tp

    precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0

    accuracy = (pred == gt).sum() / pred.size

    return {
        "IoU": round(iou, 4),
        "Dice": round(dice, 4),
        "Precision": round(precision, 4),
        "Recall": round(recall, 4),
        "Pixel_Accuracy": round(accuracy, 4)
    }
