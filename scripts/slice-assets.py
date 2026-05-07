from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1]


def trim_icon(tile: Image.Image, padding: int = 20) -> Image.Image:
    tile = tile.convert("RGBA")
    bg = Image.new("RGBA", tile.size, tile.getpixel((0, 0)))
    diff = ImageChops.difference(tile, bg)
    bbox = diff.getbbox()
    if not bbox:
        return tile
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(tile.width, right + padding)
    bottom = min(tile.height, bottom + padding)
    return tile.crop((left, top, right, bottom))


def slice_board(source: str, rows: int, cols: int, outputs: list[str]) -> None:
    image = Image.open(ROOT / source).convert("RGBA")
    tile_w = image.width // cols
    tile_h = image.height // rows
    for index, output in enumerate(outputs):
        row = index // cols
        col = index % cols
        box = (col * tile_w, row * tile_h, (col + 1) * tile_w, (row + 1) * tile_h)
        tile = image.crop(box)
        tile = trim_icon(tile)
        target = ROOT / output
        target.parent.mkdir(parents=True, exist_ok=True)
        tile.save(target)


def main() -> None:
    slice_board("public/assets/boards/scenario-icons-board.png", 2, 3, [
        "public/assets/icons/scenarios/exhibition.png",
        "public/assets/icons/scenarios/performance.png",
        "public/assets/icons/scenarios/library.png",
        "public/assets/icons/scenarios/culture-center.png",
        "public/assets/icons/scenarios/reading.png",
        "public/assets/icons/scenarios/accessibility.png",
    ])
    slice_board("public/assets/boards/category-icons-board.png", 2, 4, [
        "public/assets/icons/categories/museum-art.png",
        "public/assets/icons/categories/theater.png",
        "public/assets/icons/categories/library.png",
        "public/assets/icons/categories/culture-center.png",
        "public/assets/icons/categories/reading-space.png",
        "public/assets/icons/categories/park-scenic.png",
        "public/assets/icons/categories/culture-map.png",
        "public/assets/icons/categories/accessibility.png",
    ])
    slice_board("public/assets/boards/audience-icons-board.png", 2, 3, [
        "public/assets/icons/audiences/student.png",
        "public/assets/icons/audiences/worker.png",
        "public/assets/icons/audiences/senior.png",
        "public/assets/icons/audiences/family.png",
        "public/assets/icons/audiences/disabled.png",
        "public/assets/icons/audiences/tourist.png",
    ])
    slice_board("public/assets/boards/accessibility-icons-board.png", 2, 4, [
        "public/assets/icons/accessibility/entrance.png",
        "public/assets/icons/accessibility/restroom.png",
        "public/assets/icons/accessibility/wheelchair.png",
        "public/assets/icons/accessibility/low-counter.png",
        "public/assets/icons/accessibility/parking.png",
        "public/assets/icons/accessibility/route.png",
        "public/assets/icons/accessibility/elevator.png",
        "public/assets/icons/accessibility/guide.png",
    ])
    slice_board("public/assets/boards/map-marker-icons-board.png", 2, 3, [
        "public/assets/icons/map/default-location.png",
        "public/assets/icons/map/library-marker.png",
        "public/assets/icons/map/performance-marker.png",
        "public/assets/icons/map/museum-marker.png",
        "public/assets/icons/map/accessibility-marker.png",
        "public/assets/icons/map/my-location.png",
    ])
    slice_board("public/assets/boards/filter-tags-board.png", 3, 4, [
        "public/assets/icons/tags/free.png",
        "public/assets/icons/tags/weekend.png",
        "public/assets/icons/tags/student-friendly.png",
        "public/assets/icons/tags/family-friendly.png",
        "public/assets/icons/tags/senior-friendly.png",
        "public/assets/icons/tags/accessibility-friendly.png",
        "public/assets/icons/tags/official-source.png",
        "public/assets/icons/tags/need-verify.png",
        "public/assets/icons/tags/low-cost.png",
        "public/assets/icons/tags/public-culture.png",
        "public/assets/icons/tags/reading-learning.png",
        "public/assets/icons/tags/performance-exhibition.png",
    ])


if __name__ == "__main__":
    main()
