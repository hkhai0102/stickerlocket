// ============================================================
    // BỔ SUNG: CẤU HÌNH STICKER & DECORATION ITEMS
    // ============================================================
    Object.assign(obj.entries, {
        stickers_enabled: "true",
        custom_stickers_enabled: "true",
        sticker_items: JSON.stringify([
            {
                section: "✨ Sticker Cực Chill",
                items: [
                    { sticker_id: "sticker:heart_fire", url: "https://storage.googleapis.com/locket-public/overlays/heart_fire.png" },
                    { sticker_id: "sticker:star_sparkle", url: "https://storage.googleapis.com/locket-public/overlays/star_sparkle.png" }
                ]
            }
        ]),
        overlays_v2_config: JSON.stringify({
            suggestions_enabled: true,
            stickers_enabled: true,
            custom_images_enabled: true
        })
    });