use std::path::Path;
use image::{GenericImage, GenericImageView, ImageBuffer, RgbImage};

pub fn CreateThumbnail(source: &String, destination: &String, newWidth: u32) {
    let img_path = Path::new(source);
    let image = image::open(&img_path).expect("Failed to open images file");

    let (width, height) = image.dimensions();
    let (thumb_width, thumb_height) = calculate_thumbnail_size(width, height, newWidth, newWidth);

    let thumbnail = image.thumbnail_exact(thumb_width, thumb_height);

    let thumb_path = Path::new(destination);
    thumbnail.save(&thumb_path).expect("Failed to save thumbnail");
}


fn calculate_thumbnail_size(width: u32, height: u32, max_width: u32, max_height: u32) -> (u32, u32) {
    let aspect_ratio = width as f32 / height as f32;

    let thumb_width = if width > height || width == height && max_width < max_height {
        max_width
    } else {
        (max_height as f32 * aspect_ratio).round() as u32
    };

    let thumb_height = if height > width || height == width && max_height < max_width {
        max_height
    } else {
        (max_width as f32 / aspect_ratio).round() as u32
    };

    (thumb_width, thumb_height)
}