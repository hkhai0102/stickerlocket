// ============================================================
// Locket Remote Config Rewrite
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Loon / Quantumult X / Surge / Shadowrocket
// Tác giả: @hkhai0102
// Vui lòng khi chia sẽ hoặc lấy về, làm ơn để nguồn giúp mình. Mình cảm ơn
// ============================================================

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không sử dụng chúng dưới mục đích thương mại!";
    obj.entries = obj.entries || {};

   // ============================================================
    // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL
    // ============================================================
    Object.assign(obj.entries, {
        feature_gates: JSON.stringify({
            app_icon_picker: "enabled",
            camera_roll: "enabled",
            camera_theme: "enabled",
            locket_views: "enabled",
            long_captions: "enabled",
            longer_video: "enabled",
            unlimited_friends: "enabled",
            priority_support: "enabled",
            profile_badge: "enabled",
            remove_ads: "enabled",
            video: "enabled",
            custom_widget_frames: "enabled",
            streak_recovery: "enabled",
            stickers: "enabled",
            custom_stickers: "enabled",
            photo_stickers: "enabled"
        }),
        upsell_features: JSON.stringify({
            app_icon_picker: true,
            camera_roll: true,
            camera_theme: true,
            locket_views: true,
            remove_ads: true,
            custom_widget_frames: true,
            stickers: true,
            custom_stickers: true
        }),
        paywall_presentation_config: JSON.stringify({
            uid: "paywall_testflight",
            onboarding: false,
            after_sent_moment: false,
            on_foreground: false,
            interval: 2592000,
            profile_banner: true
        }),
        feature_discovery_popup_config: JSON.stringify({
            tag: "UNLOCKED",
            tag_gradient: true,
            //tag_style: "gold_gradient",
            title: "Locket Gold",
            feature_set: [
                {
                    title: "Đã lên Gold! ✨",
                    body: "Nhớ follow kênh tiktok @hkhai0102 ✨",
                    imageURL: "https://cdn.upanhlaylink.com/i/GSfYXmKd.png"
                }
            ],
            primary_button_title: "Xong rồi nhé!",
            campaign: "locket_gold",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59",
            use_local_time_zone: true
        }),
        android_subscribe_gold_button_enabled: "false",
        profile_badge_visible: "true",
        lunar_new_year_app_icon_enabled: "true",
        settings_instagram_url: "https://www.instagram.com/hkhai0102/",
        settings_tiktok_url: "https://tiktok.com/@hkhai0102",
        star_sign_caption_image_url: "https://storage.googleapis.com/locket-public/overlays/star_signs",
    });
    // ============================================================
    // 2. CHẶN QUẢNG CÁO & TẮT TRACKING (SENTRY)
    // ============================================================
    Object.assign(obj.entries, {
        history_ads_mode: "off",
        history_ads_prefetch_count: "0",
        history_ads_prefetch_immediate: "false",
        history_ads_prefetch_reroute: "false",
        history_ads_dynamic_insertion: "false",
        history_ads_refresh_prefetch_on_foreground: "false",
        history_ads_floor_price: "0",
        history_ads_floor_price_att: "0",
        history_ad_log_displayed_on_background: "false",
        history_ads_debug_menu: "false",
        sentry_sample_rate: "0",
        sentry_network_tracing: "false",
        sentry_performance_tracking: "false",
        sentry_trace_sample_rate: "0",
        sentry_profiles_sample_rate: "0",
        nimbus_cancellable_requests: "true",
        history_ads_nimbus_interceptors: JSON.stringify([]),
        history_ads_nimbus_formats: JSON.stringify([]),
        nimbus_errors_logged_override: JSON.stringify({"NimbusFetchError": 0, "NimbusRateLimitError": 0})
    });

    // ============================================================
    // 3. CAMERA, VIDEO, FILTERS & UPLOAD QUALITY
    // ============================================================
    function makePhotoboothFilter(id, name, imageUrl, colors, category, options = {}) {
        const {prompt = id, tintColor = colors[0], sfSymbol = "camera.filters", filterType = "cutout", overlay = true} = options;
        // List previews use small assets; overlay URLs retain the original image.
        const previewUrl = "https://locket.dinhduyvinh.tech/thumbnails/" + id + ".png";
        return {
            uid: id,
            id: id,
            name: name,
            category: category,
            prompt: prompt,
            style: "cutout",
            type: "normal",
            filterType: filterType,
            overlay: overlay,
            imageUrl: previewUrl,
            iconUrl: previewUrl,
            overlayImageUrl: imageUrl,
            overlayImageURL: imageUrl,
            tintColor: tintColor,
            colors: colors,
            captureButtonColors: colors,
            icon: {url: previewUrl, iconUrl: previewUrl, remoteImage: previewUrl, sfSymbol: sfSymbol, symbol: sfSymbol, emoji: ""},
            outputUrl: null,
            productUrl: null,
            textColor: "#FFFFFF",
            referenceImages: []
        };
    }
    var photobooth2Filters = [
        makePhotoboothFilter("pb_khung2_Polaroid_vintage", "Polaroid Vintage", "https://locket.dinhduyvinh.tech/images/pb_khung2_Polaroid_vintage.png", ["#8D7B66", "#E7DDCC"], "PhotoBooth 2 ảnh", { sfSymbol: "photo.on.rectangle" }),
        makePhotoboothFilter("pb_khung2_merry_christmas", "Giáng Sinh Len Ấm", "https://locket.dinhduyvinh.tech/images/pb_khung2_merry_christmas.png", ["#97312F", "#EADCC5"], "PhotoBooth 2 ảnh", { sfSymbol: "gift.fill" }),
        makePhotoboothFilter("pb_khung2_soulmate", "Soulmate", "https://locket.dinhduyvinh.tech/images/pb_khung2_soulmate.png", ["#353535", "#D6CBB8"], "PhotoBooth 2 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung2_monkey", "Đôi Bạn Monkey", "https://locket.dinhduyvinh.tech/images/pb_khung2_monkey.png", ["#514D29", "#A77B56"], "Khung 2 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung2_love_postcard", "Love Postcard", "https://locket.dinhduyvinh.tech/images/pb_khung2_love_postcard.png", ["#673C52", "#DAB8C8"], "PhotoBooth 2 ảnh", { sfSymbol: "envelope.fill" }),
        makePhotoboothFilter("pb_khung2_camera_pic", "Camera Kỷ Niệm", "https://locket.dinhduyvinh.tech/images/pb_khung2_camera_pic.png", ["#11182C", "#CBD0D9"], "PhotoBooth 2 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung2_anhdep", "Hai Tấm Xinh Xinh", "https://locket.dinhduyvinh.tech/images/pb_khung2_anhdep.png", ["#7F0000", "#D9A0A0"], "PhotoBooth 2 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung2_anhco", "Ký Ức Polaroid", "https://locket.dinhduyvinh.tech/images/pb_khung2_anhco.png", ["#303030", "#D6D3CE"], "PhotoBooth 2 ảnh", { sfSymbol: "photo.on.rectangle" }),
        makePhotoboothFilter("pb_khung2_di_choi_thoi", "Hẹn Nhau Đi Chơi", "https://locket.dinhduyvinh.tech/images/pb_khung2_di_choi_thoi.png", ["#9B292D", "#EAD4B5"], "PhotoBooth 2 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung2_len_do", "Lên Đồ Đi Chơi", "https://locket.dinhduyvinh.tech/images/pb_khung2_len_do.png", ["#300020", "#B01060"], "PhotoBooth 2 ảnh", { sfSymbol: "tshirt.fill" }),
        makePhotoboothFilter("pb_khung2_tin_nong", "Tin Nóng Hôm Nay", "https://locket.dinhduyvinh.tech/images/pb_khung2_tin_nong.png", ["#E0C080", "#F0D8B0"], "PhotoBooth 2 ảnh", { sfSymbol: "newspaper.fill" }),
        makePhotoboothFilter("pb_khung2_thang_ngay_ben_nhau", "Tháng Ngày Bên Nhau", "https://locket.dinhduyvinh.tech/images/pb_khung2_thang_ngay_ben_nhau.png", ["#C00000", "#F02000"], "PhotoBooth 2 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung2_may_anh", "Góc Máy Thanh Xuân", "https://locket.dinhduyvinh.tech/images/pb_khung2_may_anh.png", ["#77776F", "#D1CEC1"], "PhotoBooth 2 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung2_ki_niem", "Kỷ Niệm Chúng Mình", "https://locket.dinhduyvinh.tech/images/pb_khung2_ki_niem.png", ["#E080F0", "#F0B0F0"], "PhotoBooth 2 ảnh", { sfSymbol: "photo.on.rectangle" }),
        makePhotoboothFilter("pb_khung2_khi_tinh_iu_den", "Khi Tình Yêu Đến", "https://locket.dinhduyvinh.tech/images/pb_khung2_khi_tinh_iu_den.png", ["#0040E0", "#70A0F0"], "PhotoBooth 2 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung2_khi_e_vang", "Khi Em Vắng Anh", "https://locket.dinhduyvinh.tech/images/pb_khung2_khi_e_vang.png", ["#252525", "#E5E5E5"], "PhotoBooth 2 ảnh", { sfSymbol: "heart" }),
        makePhotoboothFilter("pb_khung2_dieu_em_uoc_ao", "Điều Em Ước Ao", "https://locket.dinhduyvinh.tech/images/pb_khung2_dieu_em_uoc_ao.png", ["#B66ABB", "#EAD4E9"], "PhotoBooth 2 ảnh", { sfSymbol: "star.fill" }),
        makePhotoboothFilter("pb_khung2_thelove", "The Love Times", "https://locket.dinhduyvinh.tech/images/pb_khung2_thelove.png", ["#111111", "#EAEAEA"], "PhotoBooth 2 ảnh", { sfSymbol: "newspaper.fill" }),
        makePhotoboothFilter("pb_khung2_outfit", "Outfit Check", "https://locket.dinhduyvinh.tech/images/pb_khung2_outfit.png", ["#2C2C2C", "#D8C6A3"], "PhotoBooth 2 ảnh", { sfSymbol: "tshirt.fill" }),
        makePhotoboothFilter("pb_khung2_thu_tinh", "Thư Tình Ngọt Ngào", "https://locket.dinhduyvinh.tech/images/pb_khung2_thu_tinh.png", ["#F3C7CF", "#F8E4E8"], "PhotoBooth 2 ảnh", { sfSymbol: "envelope.fill" }),
    ];
    var photobooth3Filters = [
        makePhotoboothFilter("pb_khung3_christmas1", "Giáng Sinh Tuần Lộc", "https://locket.dinhduyvinh.tech/images/pb_khung3_christmas1.png", ["#900D13", "#F0D4B8"], "PhotoBooth 3 ảnh", { sfSymbol: "gift.fill" }),
        makePhotoboothFilter("pb_khung3_christmas2", "Giáng Sinh Selfie", "https://locket.dinhduyvinh.tech/images/pb_khung3_christmas2.png", ["#AF3038", "#EEE9E2"], "PhotoBooth 3 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung3_christmas3", "Ho Ho Ho!", "https://locket.dinhduyvinh.tech/images/pb_khung3_christmas3.png", ["#9E1714", "#F3E4D3"], "PhotoBooth 3 ảnh", { sfSymbol: "gift.fill" }),
        makePhotoboothFilter("pb_khung3_we_are_friend", "Chúng Mình Là Bạn", "https://locket.dinhduyvinh.tech/images/pb_khung3_we_are_friend.png", ["#D76A9A", "#FFE3EF"], "PhotoBooth 3 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung3_taste_of_love", "Hương Vị Tình Yêu", "https://locket.dinhduyvinh.tech/images/pb_khung3_taste_of_love.png", ["#415C9E", "#D7E3F5"], "PhotoBooth 3 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung3_google", "Google: Tình Yêu Là Gì?", "https://locket.dinhduyvinh.tech/images/pb_khung3_google.png", ["#4285F4", "#F8F1E6"], "PhotoBooth 3 ảnh", { sfSymbol: "magnifyingglass" }),
        makePhotoboothFilter("pb_khung3_photo_iphone", "Photo iPhone", "https://locket.dinhduyvinh.tech/images/pb_khung3_photo_iphone.png", ["#CAC9D2", "#EE7472"], "PhotoBooth 3 ảnh", { sfSymbol: "photo.on.rectangle.angled" }),
        makePhotoboothFilter("pb_khung3_polaroid2", "Polaroid Kỷ Niệm", "https://locket.dinhduyvinh.tech/images/pb_khung3_polaroid2.png", ["#32312E", "#B99A7F"], "PhotoBooth 3 ảnh", { sfSymbol: "photo.stack.fill" }),
        makePhotoboothFilter("pb_khung3_fruit", "Hội Trái Cây", "https://locket.dinhduyvinh.tech/images/pb_khung3_fruit.png", ["#E97B91", "#B9D89F"], "Khung 3 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung3_da_bao", "Da Báo", "https://locket.dinhduyvinh.tech/images/pb_khung3_da_bao.png", ["#694C35", "#8C2834"], "PhotoBooth 3 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung3_mothaiba", "Một Hai Ba", "https://locket.dinhduyvinh.tech/images/pb_khung3_mothaiba.png", ["#7296BE", "#EACAD8"], "PhotoBooth 3 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung3_ngay_mai_tuoi_sang", "Ngày Mai Tươi Sáng", "https://locket.dinhduyvinh.tech/images/pb_khung3_ngay_mai_tuoi_sang.png", ["#242424", "#D9D9D9"], "PhotoBooth 3 ảnh", { sfSymbol: "sun.max.fill" }),
        makePhotoboothFilter("pb_khung3_memory", "Memory Lane", "https://locket.dinhduyvinh.tech/images/pb_khung3_memory.png", ["#103020", "#508060"], "PhotoBooth 3 ảnh", { sfSymbol: "photo.on.rectangle" }),
        makePhotoboothFilter("pb_khung3_Vinyl", "Vinyl Memories 🎵", "https://locket.dinhduyvinh.tech/images/pb_khung3_Vinyl.png", ["#581C24", "#A33A42"], "PhotoBooth 3 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("pb_khung3_Polaroid", "Polaroid Nhật Ký 📸", "https://locket.dinhduyvinh.tech/images/pb_khung3_Polaroid.png", ["#DC2626", "#F5F5F5"], "PhotoBooth 3 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung3_photodump", "Photo Dump Hôm Nay ✨", "https://locket.dinhduyvinh.tech/images/pb_khung3_photodump.png", ["#C49A6C", "#F5DEB3"], "PhotoBooth 3 ảnh", { sfSymbol: "photo.on.rectangle" }),
        makePhotoboothFilter("pb_khung3_hoi_ban_than", "Hội Bạn Thân", "https://locket.dinhduyvinh.tech/images/pb_khung3_hoi_ban_than.png", ["#A0B060", "#F0C0C0"], "PhotoBooth 3 ảnh", { sfSymbol: "person.3.fill" }),
        makePhotoboothFilter("pb_khung3_hen_nha", "Hẹn Nhau Nha", "https://locket.dinhduyvinh.tech/images/pb_khung3_hen_nha.png", ["#E0B0B0", "#F0A0A0"], "PhotoBooth 3 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung3_love_so_much", "Love So Much", "https://locket.dinhduyvinh.tech/images/pb_khung3_love_so_much.png", ["#7A0010", "#C0182B"], "PhotoBooth 3 ảnh", { sfSymbol: "heart.fill" }),
    ];
    var singleFrameFilters = [
        makePhotoboothFilter("pb_khung1_color", "Cầu Vồng Kẹo Ngọt", "https://locket.dinhduyvinh.tech/images/pb_khung1_color.png", ["#D968A1", "#FFF0BD"], "Khung 1 ảnh", { sfSymbol: "rainbow" }),
        makePhotoboothFilter("pb_khung1_meow", "Meow", "https://locket.dinhduyvinh.tech/images/pb_khung1_meow.png", ["#AB773F", "#F6E5CB"], "Khung 1 ảnh", { sfSymbol: "cat.fill" }),
        makePhotoboothFilter("pb_khung1_sao_nen_trang", "Sao Nền Trắng", "https://locket.dinhduyvinh.tech/images/pb_khung1_sao_nen_trang.png", ["#515B69", "#E8EDF2"], "Khung 1 ảnh", { sfSymbol: "star.fill" }),
        makePhotoboothFilter("pb_khung1_nen_mua", "Nền Mưa", "https://locket.dinhduyvinh.tech/images/pb_khung1_nen_mua.png", ["#657D92", "#C6DCE8"], "Khung 1 ảnh", { sfSymbol: "cloud.rain.fill" }),
        makePhotoboothFilter("pb_khung1_meme_meo", "Mèo Meme", "https://locket.dinhduyvinh.tech/images/pb_khung1_meme_meo.png", ["#826751", "#D5A64F"], "Khung 1 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung1_faker", "Faker", "https://locket.dinhduyvinh.tech/images/pb_khung1_faker.png", ["#282622", "#C7A44E"], "Khung 1 ảnh", { sfSymbol: "trophy.fill" }),
        makePhotoboothFilter("pb_khung1_mona_lisa", "Mona Lisa", "https://locket.dinhduyvinh.tech/images/pb_khung1_mona_lisa.png", ["#5D512B", "#B5A06A"], "Khung 1 ảnh", { sfSymbol: "person.crop.rectangle.fill" }),
        makePhotoboothFilter("pb_khung1_locket_camera", "Locket Camera", "https://locket.dinhduyvinh.tech/images/pb_khung1_locket_camera.png", ["#202020", "#E7B439"], "Khung 1 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung1_spotifyPC", "Spotify PC", "https://locket.dinhduyvinh.tech/images/pb_khung1_spotifyPC.png", ["#23282B", "#22C55E"], "Khung 1 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("pb_khung1_spotify_hong", "Spotify Hồng", "https://locket.dinhduyvinh.tech/images/pb_khung1_spotify_hong.png", ["#C83978", "#F5A8CC"], "Khung 1 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("pb_khung1_camfuji", "Fuji Film", "https://locket.dinhduyvinh.tech/images/pb_khung1_camfuji.png", ["#161616", "#EAA32B"], "Khung 1 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung1_messi", "Messi Cúp", "https://locket.dinhduyvinh.tech/images/pb_khung1_messi.png", ["#258599", "#D5AF49"], "Khung 1 ảnh", { sfSymbol: "trophy.fill" }),
        makePhotoboothFilter("pb_khung1_ronaldo_cup", "Ronaldo Cúp", "https://locket.dinhduyvinh.tech/images/pb_khung1_ronaldo_cup.png", ["#A82432", "#C8CED3"], "Khung 1 ảnh", { sfSymbol: "trophy.fill" }),
        makePhotoboothFilter("pb_khung1_menu_ios", "Menu iOS", "https://locket.dinhduyvinh.tech/images/pb_khung1_menu_ios.png", ["#36343D", "#96909F"], "Khung 1 ảnh", { sfSymbol: "square.and.arrow.up" }),
        makePhotoboothFilter("pb_khung2_cuoi_vespa", "Cưới Vespa", "https://locket.dinhduyvinh.tech/images/pb_khung2_cuoi_vespa.png", ["#159AAF", "#F5E4CB"], "Khung 2 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_the_hinh", "Thể Hình 💪", "https://locket.dinhduyvinh.tech/images/pb_khung1_the_hinh.png", ["#6E4634", "#B58B6C"], "Khung 1 ảnh", { sfSymbol: "dumbbell.fill" }),
        makePhotoboothFilter("pb_khung1_iphone", "Now Playing", "https://locket.dinhduyvinh.tech/images/pb_khung1_iphone.png", ["#303A43", "#9AA9B2"], "Khung 1 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("pb_khung1_tivi", "Ký Ức Màn Hình", "https://locket.dinhduyvinh.tech/images/pb_khung1_tivi.png", ["#686962", "#CBC4AD"], "Khung 1 ảnh", { sfSymbol: "tv.fill" }),
        makePhotoboothFilter("pb_khung1_the_gioi_cua_2_ta", "Thế Giới Của Hai Ta", "https://locket.dinhduyvinh.tech/images/pb_khung1_the_gioi_cua_2_ta.png", ["#222222", "#E5E5E5"], "Khung 1 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_selflove", "Self Love Club", "https://locket.dinhduyvinh.tech/images/pb_khung1_selflove.png", ["#383530", "#DED6C8"], "Khung 1 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_ptb", "MIXTAPE VOIL.1", "https://locket.dinhduyvinh.tech/images/pb_khung1_ptb.png", ["#222222", "#E5E5E5"], "Khung 1 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("pb_khung1_oi_tinh_yeu", "Ôi, Tình Yêu!", "https://locket.dinhduyvinh.tech/images/pb_khung1_oi_tinh_yeu.png", ["#90F000", "#306000"], "Khung 1 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_card", "Thẻ Thanh Xuân", "https://locket.dinhduyvinh.tech/images/pb_khung1_card.png", ["#103060", "#4060A0"], "Khung 1 ảnh", { sfSymbol: "person.crop.rectangle" }),
        makePhotoboothFilter("pb_khung1_love_e_nhiu", "Love Em Nhiều", "https://locket.dinhduyvinh.tech/images/pb_khung1_love_e_nhiu.png", ["#E77C30", "#CA58B5"], "Khung 1 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_ki_niem_tuoi_dep", "Kỷ Niệm Tươi Đẹp", "https://locket.dinhduyvinh.tech/images/pb_khung1_ki_niem_tuoi_dep.png", ["#252525", "#DAD7CE"], "Khung 1 ảnh", { sfSymbol: "photo.on.rectangle" }),
        makePhotoboothFilter("pb_khung1_ins", "Instagram Moments", "https://locket.dinhduyvinh.tech/images/pb_khung1_ins.png", ["#343434", "#F05B65"], "Khung 1 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung1_hoi_chieu_troi_mua", "Hồi Chiều Trời Mưa", "https://locket.dinhduyvinh.tech/images/pb_khung1_hoi_chieu_troi_mua.png", ["#C02030", "#E0D0B0"], "Khung 1 ảnh", { sfSymbol: "cloud.rain.fill" }),
        makePhotoboothFilter("pb_khung1_dia", "Chiếc Đĩa Kỷ Niệm", "https://locket.dinhduyvinh.tech/images/pb_khung1_dia.png", ["#8B641E", "#D4C6A1"], "Khung 1 ảnh", { sfSymbol: "opticaldisc" }),
        makePhotoboothFilter("pb_khung1_chuong_cuoi", "Chương Cuối Thanh Xuân", "https://locket.dinhduyvinh.tech/images/pb_khung1_chuong_cuoi.png", ["#515151", "#D1D1D1"], "Khung 1 ảnh", { sfSymbol: "book.closed.fill" }),
        makePhotoboothFilter("pb_khung1_maytinh", "Màn Hình Hoài Niệm", "https://locket.dinhduyvinh.tech/images/pb_khung1_maytinh.png", ["#706050", "#C0A080"], "Khung 1 ảnh", { sfSymbol: "desktopcomputer" }),
        makePhotoboothFilter("pb_khung1_mat_tin_hieu", "No Signal", "https://locket.dinhduyvinh.tech/images/pb_khung1_mat_tin_hieu.png", ["#402060", "#8050B0"], "Khung 1 ảnh", { sfSymbol: "antenna.radiowaves.left.and.right" }),
        makePhotoboothFilter("pb_khung1_Camera_iPhone", "Camera iPhone", "https://locket.dinhduyvinh.tech/images/pb_khung1_Camera_iPhone.png", ["#7A1F1F", "#C84B4B"], "Khung 1 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung1_khong_buong", "Không Buông", "https://locket.dinhduyvinh.tech/images/pb_khung1_khong_buong.png", ["#355C7D", "#6C8FA8"], "Khung 1 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("trend_gay_meter", "Gay Meter · Random 🌈", "https://locket.dinhduyvinh.tech/images/trend_gay_meter.png", ["#A28ADD", "#EF648D"], "Trend", { filterType: "normal", overlay: false, sfSymbol: "sparkles", prompt: "Random 0-100 score for fun only; does not infer sexual orientation." }),
        makePhotoboothFilter("weekday_depth", "Hôm Nay Thứ Mấy", "https://locket.dinhduyvinh.tech/images/weekday_depth.png", ["#243B53", "#FFFFFF"], "Trend", { filterType: "normal", overlay: false, sfSymbol: "calendar" }),
        makePhotoboothFilter("pb_khung1_chua_som", "Chửa Sớm", "https://locket.dinhduyvinh.tech/images/pb_khung1_chua_som.png", ["#252525", "#D8C6B1"], "Trend", { sfSymbol: "text.bubble.fill" }),
        makePhotoboothFilter("trend_bang_tin_khan", "Bảng Tin Khẩn", "https://locket.dinhduyvinh.tech/images/trend_bang_tin_khan.png", ["#D62828", "#1D4ED8"], "Khung 1 ảnh", { sfSymbol: "newspaper.fill" }),
        makePhotoboothFilter("trend_ve_giu_xe", "Vé Gửi Xe", "https://locket.dinhduyvinh.tech/images/trend_ve_giu_xe.png", ["#6F8750", "#CDDAB6"], "Khung 1 ảnh", { sfSymbol: "car.fill" }),
        makePhotoboothFilter("trend_vo_hoc_sinh", "Vở Học Sinh", "https://locket.dinhduyvinh.tech/images/trend_vo_hoc_sinh.png", ["#D94742", "#E9C85E"], "Khung 1 ảnh", { sfSymbol: "book.closed.fill" }),
        makePhotoboothFilter("trend_giao_vien_cham_bai", "Giáo Viên Chấm Bài", "https://locket.dinhduyvinh.tech/images/trend_giao_vien_cham_bai.png", ["#C83232", "#F2C7BD"], "Khung 1 ảnh", { sfSymbol: "pencil" }),
        makePhotoboothFilter("trend_nhiem_vu_hom_nay_la", "Nhiệm Vụ Hôm Nay", "https://locket.dinhduyvinh.tech/images/trend_nhiem_vu_hom_nay_la.png", ["#65846A", "#F0E3CC"], "Khung 1 ảnh", { sfSymbol: "checkmark.square.fill" }),
        makePhotoboothFilter("trend_hoa_don_di_choi", "Hóa Đơn Đi Chơi", "https://locket.dinhduyvinh.tech/images/trend_hoa_don_di_choi.png", ["#A67C52", "#E5E7EB"], "Khung 1 ảnh", { sfSymbol: "doc.text.fill" }),
        makePhotoboothFilter("trend_binh_luan_duoc_ghim", "Bình Luận Được Ghim", "https://locket.dinhduyvinh.tech/images/trend_binh_luan_duoc_ghim.png", ["#9CA3AF", "#111827"], "Khung 1 ảnh", { sfSymbol: "pin.fill" }),
        makePhotoboothFilter("trend_camera_an_ninh", "Camera An Ninh", "https://locket.dinhduyvinh.tech/images/trend_camera_an_ninh.png", ["#374151", "#EF4444"], "Khung 1 ảnh", { sfSymbol: "video.fill" }),
        makePhotoboothFilter("trend_thong_bao_ngan_hang", "Thông Báo Ngân Hàng", "https://locket.dinhduyvinh.tech/images/trend_thong_bao_ngan_hang.png", ["#16A34A", "#E5E7EB"], "Khung 1 ảnh", { sfSymbol: "creditcard.fill" }),
        makePhotoboothFilter("trend_chat_nhom_leak", "Chat Nhóm Leak", "https://locket.dinhduyvinh.tech/images/trend_chat_nhom_leak.png", ["#1559E8", "#D5E3FF"], "Khung 1 ảnh", { sfSymbol: "bubble.left.and.bubble.right.fill" }),
        makePhotoboothFilter("pb_khung1_photobooth_cute", "Photobooth Cute", "https://locket.dinhduyvinh.tech/images/pb_khung1_photobooth_cute.png", ["#FFD6E0", "#FFE4EC"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung1_frame_classic_pb", "Photobooth Cổ Điển", "https://locket.dinhduyvinh.tech/images/pb_khung1_frame_classic_pb.png", ["#FF758C", "#FF7EB3"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung1_hello_kitty_pastel_ngot_ngao", "Hello Kitty Ngọt Ngào", "https://locket.dinhduyvinh.tech/images/pb_khung1_hello_kitty_pastel_ngot_ngao.png", ["#FF758C", "#FF7EB3"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_hello_kitty_hong_pastel", "Khung Hello Kitty Hồng", "https://locket.dinhduyvinh.tech/images/pb_khung1_hello_kitty_hong_pastel.png", ["#FF758C", "#FF7EB3"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_pastel_vien_ren", "Nơ Pastel Viền Ren", "https://locket.dinhduyvinh.tech/images/pb_khung1_pastel_vien_ren.png", ["#FF758C", "#FF7EB3"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_hoa_pastel_vien_xanh_xinh", "Hoa Xinh Pastel", "https://locket.dinhduyvinh.tech/images/pb_khung1_hoa_pastel_vien_xanh_xinh.png", ["#51e6e4", "#fce03f"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_spiderred", "Nhện Đỏ", "https://locket.dinhduyvinh.tech/images/pb_khung1_spiderred.png", ["#8F1D28", "#B8B0AE"], "Frames", { sfSymbol: "ant.fill" }),
        makePhotoboothFilter("pb_khung1_khong_gian_xanh_pastel", "Không Gian Xanh", "https://locket.dinhduyvinh.tech/images/pb_khung1_khong_gian_xanh_pastel.png", ["#66BDE6", "#F4D260"], "Frames", { sfSymbol: "moon.stars.fill" }),
        makePhotoboothFilter("pb_khung1_ngoi_sao_hong_pastel", "Ngôi Sao Hồng", "https://locket.dinhduyvinh.tech/images/pb_khung1_ngoi_sao_hong_pastel.png", ["#EF82BB", "#FFD4E8"], "Frames", { sfSymbol: "star.fill" }),
        makePhotoboothFilter("pb_khung1_pastel_so_hai_cau", "Sò Hải Cẩu Pastel", "https://locket.dinhduyvinh.tech/images/pb_khung1_pastel_so_hai_cau.png", ["#8DC6F0", "#D8ECFC"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_shin_chan", "Shin-Chan", "https://locket.dinhduyvinh.tech/images/pb_khung1_shin_chan.png", ["#f00008", "#faed32"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_anh_hellokitty_v_sao", "Hello Kitty & Sao", "https://locket.dinhduyvinh.tech/images/pb_khung1_anh_hellokitty_v_sao.png", ["#780c23", "#a94770"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_xanh_tay_sao_vang", "Sao Vàng Xanh", "https://locket.dinhduyvinh.tech/images/pb_khung1_xanh_tay_sao_vang.png", ["#6fb1d3", "#cdd64c"], "Frames", { sfSymbol: "star.fill" }),
        makePhotoboothFilter("pb_khung1_sinh_nhat_hello_kitty", "Sinh Nhật Hello Kitty", "https://locket.dinhduyvinh.tech/images/pb_khung1_sinh_nhat_hello_kitty.png", ["#B94C49", "#ECD5AF"], "Frames", { sfSymbol: "gift.fill" }),
        makePhotoboothFilter("pb_khung1_y2k_silver_holo", "Khung Y2K Silver Holo", "https://locket.dinhduyvinh.tech/images/pb_khung1_y2k_silver_holo.png", ["#C4B5FD", "#E0E7FF"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_denim_ripped", "Khung Denim Cá Tính", "https://locket.dinhduyvinh.tech/images/pb_khung1_denim_ripped.png", ["#294D75", "#ADBFD0"], "Frames", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung1_film_nostalgia", "Khung Film Hoài Cổ", "https://locket.dinhduyvinh.tech/images/pb_khung1_film_nostalgia.png", ["#D6A36A", "#FDE68A"], "Frames", { sfSymbol: "film.fill" }),
        makePhotoboothFilter("pb_khung1_locket", "Practical Magic 2", "https://locket.dinhduyvinh.tech/images/pb_khung1_locket.png", ["#A78036", "#E6CEA0"], "AI", { sfSymbol: "sparkles" }),
        makePhotoboothFilter("pb_khung1_thu_tinh", "Thư Tình Gửi Cậu 💌", "https://locket.dinhduyvinh.tech/images/pb_khung1_thu_tinh.png", ["#E8A9B5", "#F8D9D9"], "Khung 1 ảnh", { sfSymbol: "envelope.fill" }),
        makePhotoboothFilter("pb_khung1_cute", "Cute Hết Cứu 🎀", "https://locket.dinhduyvinh.tech/images/pb_khung1_cute.png", ["#FF9BCB", "#F9D5EA"], "Khung 1 ảnh", { sfSymbol: "sparkles" }),
        makePhotoboothFilter("pb_khung1_anh_tho", "Ảnh Thờ 🤡", "https://locket.dinhduyvinh.tech/images/pb_khung1_anh_tho.png", ["#C78B38", "#E5B96E"], "Khung 1 ảnh", { sfSymbol: "photo" }),
        makePhotoboothFilter("pb_khung1_matmoc", "Mặt Mộc 🤪", "https://locket.dinhduyvinh.tech/images/pb_khung1_matmoc.png", ["#383538", "#C4A374"], "Khung 1 ảnh", { sfSymbol: "person.fill" }),
        makePhotoboothFilter("pb_khung1_luffy", "Truy Nã", "https://locket.dinhduyvinh.tech/images/pb_khung1_luffy.png", ["#D9C3A7", "#FFF1D8"], "Khung 1 ảnh", { sfSymbol: "flag.fill" }),
    ];
    var fourFrameFilters = [
        makePhotoboothFilter("pb_khung4_merry_christmas", "Thư Giáng Sinh", "https://locket.dinhduyvinh.tech/images/pb_khung4_merry_christmas.png", ["#202020", "#B72424"], "PhotoBooth 4 ảnh", { sfSymbol: "envelope.fill" }),
        makePhotoboothFilter("pb_khung4_christmas_palette", "Giáng Sinh Tuyết Xanh", "https://locket.dinhduyvinh.tech/images/pb_khung4_christmas_palette.png", ["#426E89", "#DCEFF8"], "PhotoBooth 4 ảnh", { sfSymbol: "snowflake" }),
        makePhotoboothFilter("pb_khung4_happy_birthday", "Sinh Nhật Y2K", "https://locket.dinhduyvinh.tech/images/pb_khung4_happy_birthday.png", ["#242424", "#C4E76B"], "PhotoBooth 4 ảnh", { sfSymbol: "gift.fill" }),
        makePhotoboothFilter("pb_khung4_shin1", "Shin Xanh Tinh Nghịch", "https://locket.dinhduyvinh.tech/images/pb_khung4_shin1.png", ["#279ED6", "#CDEFFC"], "PhotoBooth 4 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung4_shin2", "Shin Hồng Dễ Thương", "https://locket.dinhduyvinh.tech/images/pb_khung4_shin2.png", ["#ED75B1", "#FFE1EF"], "PhotoBooth 4 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung4_shin3", "Shin Cam Năng Động", "https://locket.dinhduyvinh.tech/images/pb_khung4_shin3.png", ["#EF6217", "#FFE1BC"], "PhotoBooth 4 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung4_smile", "Smile!", "https://locket.dinhduyvinh.tech/images/pb_khung4_smile.png", ["#252525", "#FFF4D5"], "PhotoBooth 4 ảnh", { sfSymbol: "face.smiling.fill" }),
        makePhotoboothFilter("pb_khung4_scrapbook_do", "Scrapbook Đỏ", "https://locket.dinhduyvinh.tech/images/pb_khung4_scrapbook_do.png", ["#671C2A", "#E7E1D8"], "PhotoBooth 4 ảnh", { sfSymbol: "square.grid.2x2.fill" }),
        makePhotoboothFilter("pb_khung4_inspire_arena", "Inspire Arena", "https://locket.dinhduyvinh.tech/images/pb_khung4_inspire_arena.png", ["#267BB5", "#B7D8F0"], "PhotoBooth 4 ảnh", { sfSymbol: "music.note" }),
        makePhotoboothFilter("pb_khung4_my_vault", "My Vault", "https://locket.dinhduyvinh.tech/images/pb_khung4_my_vault.png", ["#292929", "#C4C8CE"], "PhotoBooth 4 ảnh", { sfSymbol: "bolt.fill" }),
        makePhotoboothFilter("pb_khung4_cham_bi", "Chấm Bi", "https://locket.dinhduyvinh.tech/images/pb_khung4_cham_bi.png", ["#694A4B", "#F0D4DE"], "PhotoBooth 4 ảnh", { sfSymbol: "circle.grid.2x2.fill" }),
        makePhotoboothFilter("pb_khung4_cham_bi_den", "Chấm Bi Đen", "https://locket.dinhduyvinh.tech/images/pb_khung4_cham_bi_den.png", ["#242424", "#ECECEC"], "PhotoBooth 4 ảnh", { sfSymbol: "circle.grid.2x2.fill" }),
        makePhotoboothFilter("pb_khung4_likeble", "Likeble", "https://locket.dinhduyvinh.tech/images/pb_khung4_likeble.png", ["#B39C57", "#F6ECD0"], "PhotoBooth 4 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung4_razzle", "Razzle Dazzle", "https://locket.dinhduyvinh.tech/images/pb_khung4_razzle.png", ["#806044", "#D3BB91"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung4_your_title", "Your Title", "https://locket.dinhduyvinh.tech/images/pb_khung4_your_title.png", ["#60462D", "#ECD1A2"], "PhotoBooth 4 ảnh", { sfSymbol: "newspaper.fill" }),
        makePhotoboothFilter("pb_khung4_soulmate_film", "Soulmate Film", "https://locket.dinhduyvinh.tech/images/pb_khung4_soulmate_film.png", ["#8C2937", "#F1E7DB"], "PhotoBooth 4 ảnh", { sfSymbol: "heart.fill" }),
        makePhotoboothFilter("pb_khung4_mimi", "Mimi Say Cheese", "https://locket.dinhduyvinh.tech/images/pb_khung4_mimi.png", ["#5D8DBA", "#F6B8D3"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung4_fairy_film", "Fairy Film", "https://locket.dinhduyvinh.tech/images/pb_khung4_fairy_film.png", ["#344F7B", "#D9BF94"], "PhotoBooth 4 ảnh", { sfSymbol: "envelope.fill" }),
        makePhotoboothFilter("pb_khung4_foto_lush", "Foto Lush", "https://locket.dinhduyvinh.tech/images/pb_khung4_foto_lush.png", ["#6F6A63", "#E9DFCA"], "PhotoBooth 4 ảnh", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_photoism", "Photoism", "https://locket.dinhduyvinh.tech/images/pb_khung4_photoism.png", ["#242424", "#B9A2BC"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.fill" }),
        makePhotoboothFilter("pb_khung4_twinkle_booth", "Twinkle Booth", "https://locket.dinhduyvinh.tech/images/pb_khung4_twinkle_booth.png", ["#674323", "#EAD298"], "PhotoBooth 4 ảnh", { sfSymbol: "star.fill" }),
        makePhotoboothFilter("pb_khung4_equinox", "Equinox Studio", "https://locket.dinhduyvinh.tech/images/pb_khung4_equinox.png", ["#174C9B", "#B62432"], "PhotoBooth 4 ảnh", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_i_love_you", "I Love You", "https://locket.dinhduyvinh.tech/images/pb_khung4_i_love_you.png", ["#795D3D", "#DCCBAA"], "PhotoBooth 4 ảnh", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_film", "Cuộn Phim 35mm", "https://locket.dinhduyvinh.tech/images/pb_khung4_film.png", ["#1C1C1C", "#B8B8B8"], "Photobooth", { tintColor: "#B8B8B8", sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_dream_cream", "Denim & Kem", "https://locket.dinhduyvinh.tech/images/pb_khung4_dream_cream.png", ["#405978", "#F3E7D7"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_scrapbook", "Scrapbook Kỷ Niệm", "https://locket.dinhduyvinh.tech/images/pb_khung4_scrapbook.png", ["#C9B08A", "#EADCC2"], "PhotoBooth 4 ảnh", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_so_cool", "So Cool", "https://locket.dinhduyvinh.tech/images/pb_khung4_so_cool.png", ["#D85C9A", "#F3B9D2"], "PhotoBooth 4 ảnh", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_berry_days", "Photobooth Berry Days", "https://locket.dinhduyvinh.tech/images/pb_khung4_berry_days.png", ["#FFB6C1", "#FF69B4"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_happy_snap", "Photobooth Happy Snap", "https://locket.dinhduyvinh.tech/images/pb_khung4_happy_snap.png", ["#5F5098", "#C0B3E1"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_sky_diary", "Photobooth Sky Diary", "https://locket.dinhduyvinh.tech/images/pb_khung4_sky_diary.png", ["#73815B", "#D9C69D"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_4cut", "Photobooth 4 ô", "https://locket.dinhduyvinh.tech/images/pb_khung4_4cut.png", ["#FFD6E0", "#FFE4EC"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_holo_4cut", "Photobooth Y2K Holo", "https://locket.dinhduyvinh.tech/images/pb_khung4_holo_4cut.png", ["#C4B5FD", "#E0E7FF"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_scrapbook_ripped_4cut", "Photobooth Scrapbook", "https://locket.dinhduyvinh.tech/images/pb_khung4_scrapbook_ripped_4cut.png", ["#D6A36A", "#FDE68A"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_ripped_paper_4cut", "Photobooth Ripped Paper", "https://locket.dinhduyvinh.tech/images/pb_khung4_ripped_paper_4cut.png", ["#8D2424", "#D6C9AE"], "Photobooth", { sfSymbol: "square.grid.2x2" }),
        makePhotoboothFilter("pb_khung4_denim_ripped_2x2", "Photobooth Denim 4 ô", "https://locket.dinhduyvinh.tech/images/pb_khung4_denim_ripped_2x2.png", ["#315574", "#C1CCD4"], "Photobooth", { sfSymbol: "square.grid.2x2" })
    ];
    var commentTikTok = [
        makePhotoboothFilter("cmt_phai_luon_tu_te", "Phải Luôn Tử Tế", "https://locket.dinhduyvinh.tech/images/cmt_phai_luon_tu_te.png", ["#31343B", "#EF164C"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_chi_can_mot_vet_xuoc", "Chỉ Cần Một Vết Xước", "https://locket.dinhduyvinh.tech/images/cmt_chi_can_mot_vet_xuoc.png", ["#145B83", "#D3E2EC"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_siuu", "Ronaldo SIUUU", "https://locket.dinhduyvinh.tech/images/cmt_siuu.png", ["#344B5B", "#E84B60"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_binh_luan_minh_tue", "Trend Tíc Tóc", "https://locket.dinhduyvinh.tech/images/cmt_binh_luan_minh_tue.png", ["#557C77", "#D9E4DA"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_locket", "Locket Việt Nam", "https://locket.dinhduyvinh.tech/images/cmt_locket.png", ["#D99D17", "#F9D766"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_sontung", "Sơn Tùng MTP", "https://locket.dinhduyvinh.tech/images/cmt_sontung.png", ["#344C47", "#DF5B69"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_xinh", "Ai Cho Xinh Vậy", "https://locket.dinhduyvinh.tech/images/cmt_xinh.png", ["#F43F5E", "#FB7185"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_posst", "Tấm Cuối Đáng Đăng", "https://locket.dinhduyvinh.tech/images/cmt_posst.png", ["#EF4444", "#60A5FA"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_flash", "Flash Đổi Nhân Cách", "https://locket.dinhduyvinh.tech/images/cmt_flash.png", ["#06B6D4", "#EF4444"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_duanma", "Dự án ma", "https://locket.dinhduyvinh.tech/images/cmt_duanma.png", ["#EF4444", "#60A5FA"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_dichup", "Chụp 3 Tấm Lựa 3 Tiếng", "https://locket.dinhduyvinh.tech/images/cmt_dichup.png", ["#06B6D4", "#FB7185"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_chuano", "Đừng Khinh Thường Hoa", "https://locket.dinhduyvinh.tech/images/cmt_chuano.png", ["#06B6D4", "#EF4444"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" }),
        makePhotoboothFilter("cmt_anhdim", "Bạn Thân Giữ Ảnh Dìm", "https://locket.dinhduyvinh.tech/images/cmt_anhdim.png", ["#EF4444", "#22D3EE"], "Trend Comment TikTok", { sfSymbol: "bubble.left.fill" })
    ];
    var moodFrameFilters = [
        makePhotoboothFilter("pb_khung1_khong_can_ai_duyet", "Không Cần Ai Duyệt", "https://locket.dinhduyvinh.tech/images/pb_khung1_khong_can_ai_duyet.png", ["#414141", "#D8D8D8"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_ban_la_gi_ma_toi_phai_ban_tam", "Bạn Là Gì?", "https://locket.dinhduyvinh.tech/images/pb_khung1_ban_la_gi_ma_toi_phai_ban_tam.png", ["#292929", "#DEDEDE"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_ong_troi_that_bat_cong", "Ông Trời Thật Bất Công", "https://locket.dinhduyvinh.tech/images/pb_khung1_ong_troi_that_bat_cong.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_yeu_giau_chu_co_phai_yeu_dau_dau_ma_doi_ghen", "Yêu Giấu Chứ Có Phải Yêu Dấu", "https://locket.dinhduyvinh.tech/images/pb_khung1_yeu_giau_chu_co_phai_yeu_dau_dau_ma_doi_ghen.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_me_con_dien", "Mẹ Con Điên", "https://locket.dinhduyvinh.tech/images/pb_khung1_me_con_dien.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_thieu_vang_ngot_ngao_cua_em", "Thiếu Vắng Ngọt Ngào Của Em", "https://locket.dinhduyvinh.tech/images/pb_khung1_thieu_vang_ngot_ngao_cua_em.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_loi_cua_tao_a", "Lỗi Của Tao À?", "https://locket.dinhduyvinh.tech/images/pb_khung1_loi_cua_tao_a.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_tao_song_sao", "Tao Sống Sao Kệ Tao?", "https://locket.dinhduyvinh.tech/images/pb_khung1_tao_song_sao.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_tuyet_vong", "Tuyệt Vọng", "https://locket.dinhduyvinh.tech/images/pb_khung1_tuyet_vong.png", ["#242424", "#B8B8B8"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_dech_quan_tam", "Đếch Quan Tâm", "https://locket.dinhduyvinh.tech/images/pb_khung1_dech_quan_tam.png", ["#607EA9", "#D4DCEA"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_met5_ma_cai_toi5m1", "Mét 5 Mà Cái Tôi 5m1", "https://locket.dinhduyvinh.tech/images/pb_khung1_met5_ma_cai_toi5m1.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_99_phan_tram_co_the_la_ngai", "99% Cơ Thể Là Ngại", "https://locket.dinhduyvinh.tech/images/pb_khung1_99_phan_tram_co_the_la_ngai.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_noi_ko_buon_la_noi_doi", "Nói Không Buồn Là Nói Dối", "https://locket.dinhduyvinh.tech/images/pb_khung1_noi_ko_buon_la_noi_doi.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_mo_long_lan_nao_la_du_ma_lan_do", "Mở Lòng Lần Nào Là Đủ Má Lần Đó", "https://locket.dinhduyvinh.tech/images/pb_khung1_mo_long_lan_nao_la_du_ma_lan_do.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_uoc_gi_buon_cung_ra_tien", "Ước Gì Buồn Cũng Ra Tiền", "https://locket.dinhduyvinh.tech/images/pb_khung1_uoc_gi_buon_cung_ra_tien.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_han_toan", "Hận Toán", "https://locket.dinhduyvinh.tech/images/pb_khung1_han_toan.png", ["#DC2626", "#303030"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_khong_tin_dan_ong", "Không Tin Đàn Ông", "https://locket.dinhduyvinh.tech/images/pb_khung1_khong_tin_dan_ong.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_kho_do_danh", "Khó Dỗ Dành", "https://locket.dinhduyvinh.tech/images/pb_khung1_kho_do_danh.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_xinh_gai_tinh_quai", "Xinh Gái Tinh Quái", "https://locket.dinhduyvinh.tech/images/pb_khung1_xinh_gai_tinh_quai.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_song_basic", "Sống Basic Cho Đời Cơ Bản", "https://locket.dinhduyvinh.tech/images/pb_khung1_song_basic.png", ["#CF0875", "#F5B7D6"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
        makePhotoboothFilter("pb_khung1_hoang_tu_am_o", "Hoàng Tử Ẩm Ơ", "https://locket.dinhduyvinh.tech/images/pb_khung1_hoang_tu_am_o.png", ["#343434", "#D4C9BB"], "Tâm Trạng & Cà Khịa", { sfSymbol: "quote.bubble.fill" }),
    ];
    var CameraFilters = [
        makePhotoboothFilter("photo_effect_co_dien", "Nâu Cổ Điển", "https://locket.dinhduyvinh.tech/images/photo_effect_co_dien.png", ["#8B5E3C", "#D6B990"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_dem_xanh", "Đêm Xanh", "https://locket.dinhduyvinh.tech/images/photo_effect_dem_xanh.png", ["#172554", "#3B82A6"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_film", "Film 35mm", "https://locket.dinhduyvinh.tech/images/photo_effect_film.png", ["#777B68", "#E1CFAD"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_matte", "Xám Matte", "https://locket.dinhduyvinh.tech/images/photo_effect_matte.png", ["#74706D", "#B7AEA5"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_nhat", "Tông Phai", "https://locket.dinhduyvinh.tech/images/photo_effect_nhat.png", ["#B7A99F", "#E7DDD5"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_pastel", "Pastel Dịu", "https://locket.dinhduyvinh.tech/images/photo_effect_pastel.png", ["#F2B9CF", "#C7C3F3"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_teal_va_cam", "Xanh Teal & Cam", "https://locket.dinhduyvinh.tech/images/photo_effect_teal_va_cam.png", ["#0F766E", "#F59E42"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_trang_den", "Trắng Đen", "https://locket.dinhduyvinh.tech/images/photo_effect_trang_den.png", ["#222222", "#E5E5E5"], "Camera Filters", { filterType: "normal", overlay: false, sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_tuong_phan", "Tương Phản Cao", "https://locket.dinhduyvinh.tech/images/photo_effect_tuong_phan.png", ["#292524", "#F5E8D5"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_am_ap", "Nắng Ấm", "https://locket.dinhduyvinh.tech/images/photo_effect_am_ap.png", ["#D97745", "#F9C784"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_mat_lanh", "Xanh Mát Lạnh", "https://locket.dinhduyvinh.tech/images/photo_effect_mat_lanh.png", ["#4D83A8", "#BCE4EF"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_am_mat_ong", "Vàng Mật Ong", "https://locket.dinhduyvinh.tech/images/photo_effect_am_mat_ong.png", ["#B6946F", "#EFDBC2"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_blue_hour", "Blue Hour", "https://locket.dinhduyvinh.tech/images/photo_effect_blue_hour.png", ["#616D9E", "#BEC7E8"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_film_nau", "Film Nâu", "https://locket.dinhduyvinh.tech/images/photo_effect_film_nau.png", ["#694733", "#BF9470"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_hong_milk", "Hồng Sữa", "https://locket.dinhduyvinh.tech/images/photo_effect_hong_milk.png", ["#E9A2B8", "#FCE2E9"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_lo_sang_film", "Film Lộ Sáng", "https://locket.dinhduyvinh.tech/images/photo_effect_lo_sang_film.png", ["#E46D45", "#FFD286"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_matcha", "Xanh Matcha", "https://locket.dinhduyvinh.tech/images/photo_effect_matcha.png", ["#71854B", "#C6D5A0"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_tim_y2k", "Tím Y2K", "https://locket.dinhduyvinh.tech/images/photo_effect_tim_y2k.png", ["#8B5CF6", "#E7B5FF"], "Camera Filters", { sfSymbol: "camera.filters" }),
        makePhotoboothFilter("photo_effect_xanh_film", "Xanh Film", "https://locket.dinhduyvinh.tech/images/photo_effect_xanh_film.png", ["#50828B", "#B5D9D5"], "Camera Filters", { sfSymbol: "camera.filters" })
    ];
    var AIFilters = [
        makePhotoboothFilter("ai_tai_tho", "Bờm Tai Thỏ 🐰", "https://locket.dinhduyvinh.tech/images/ai_tai_tho.png", ["#FFB6C1", "#FF69B4"], "Hiệu Ứng AI 3D Hot 🔥", {filterType: "normal", overlay: true, sfSymbol: "sparkles", prompt: "Keep the person's exact face, expression, pose, and background from the photo, and realistically place a cute fluffy white and soft pink plush bunny ears headband sitting naturally on top of their head with matching soft lighting and natural shadows. If there are multiple people, put a matching bunny ears headband on each person cleanly."}),
        makePhotoboothFilter("ai_mu_ngu_khoc", "Mũ Ngủ Khóc Nhè 😭", "https://locket.dinhduyvinh.tech/images/ai_mu_ngu_khoc.png", ["#67E8F9", "#FEF3C7"], "Hiệu Ứng AI 3D Hot 🔥", {filterType: "normal", overlay: true, sfSymbol: "sparkles", prompt: "Apply the exact cartoon face filter from the reference image to the person's face.\n\n**FILTER ELEMENTS:**\n1. A cream-colored pixel-art sleeping hat with thick black pixel outlines and a light cyan fluffy pom-pom on the left side.\n2. Large, thin, perfectly round black wire-frame glasses positioned over both eyes. Keep both circular lenses clearly visible and symmetrical.\n3. Two exaggerated glossy cyan-blue anime crying streams extending outward from the inner corners of both eyes, with small floating water droplets.\n4. A tiny black spiral doodle on the nose.\n5. Two small curved black whisker-like lines on each cheek.\n\n**FACE BEAUTIFICATION:**\n- Make the face slightly smaller and slimmer.\n- Gently reduce cheek width.\n- Create a naturally slim V-shaped jawline.\n- Keep the face proportions realistic and symmetrical.\n- Do not distort the eyes, nose, mouth, or facial identity.\n\n**IMPORTANT REQUIREMENTS:**\n- Precisely align the hat, glasses, tears, nose doodle, and cheek details with the person's facial features.\n- The glasses MUST be included and clearly visible.\n- Preserve the original person's identity, hairstyle, clothing, pose, and background.\n- Use a combination of cute 8-bit pixel art and glossy 3D cartoon effects.\n- High-quality, clean edges, realistic face tracking, polished selfie filter aesthetic.\n- Do not add extra accessories or text."}),
        makePhotoboothFilter("ai_jollibee", "Nhân Viên Jollibee 🐝", "https://locket.dinhduyvinh.tech/images/ai_jollibee.png", ["#E31837", "#FFC72C"], "Hiệu Ứng AI 3D Hot 🔥", {filterType: "normal", overlay: true, sfSymbol: "sparkles", prompt: "Edit the uploaded photograph. Keep the exact same person from the original image.\n\nChange ONLY the person's clothing into a realistic Jollibee restaurant employee uniform, as if the person is genuinely wearing it in a real photograph.\n\n**JOLLIBEE UNIFORM:**\n- A bright red short-sleeved polo shirt.\n- Yellow panels running along both shoulders and sleeves.\n- Blue and yellow striped collar.\n- Authentic Jollibee bee mascot logo embroidered on the left chest.\n- A small employee name tag on the right chest.\n- Dark navy blue waist apron with the Jollibee logo and branding.\n- Matching dark navy trousers.\n\n**REALISTIC CLOTHING DETAILS:**\n- Make the uniform fit naturally on the person's actual body.\n- Realistic fabric texture, stitching, wrinkles and folds.\n- Natural interaction between the clothing and the person's arms, shoulders and body.\n- The shirt and apron must look physically worn, not digitally pasted onto the person.\n\n**PRESERVE THE ORIGINAL PHOTO:**\n- Keep the person's original face, identity, hairstyle, skin tone and facial expression exactly unchanged.\n- Keep the original body shape, pose, hands and proportions.\n- Keep the original background, lighting, camera angle and image composition.\n- Do not change the person's age or facial features.\n\n**FINAL RESULT:**\nUltra-photorealistic real-life photograph, indistinguishable from an actual photo of the same person wearing a Jollibee employee uniform at the time the original photo was taken.\n\nNo sticker, no cartoon, no illustration, no white outline, no cutout, no transparent background, no 3D rendering."}),
        makePhotoboothFilter("ai_nak_ve_than", "Nak Vệ Thần ⚔️", "https://locket.dinhduyvinh.tech/images/ai_nak_ve_than.png", ["#3B82F6", "#93C5FD"], "Hiệu Ứng AI 3D Hot 🔥", {filterType: "normal", overlay: true, sfSymbol: "sparkles", prompt: "Transform the person in the uploaded photograph into a photorealistic real-life cosplay version of Nakroth – Dimensional Guardian from Arena of Valor.\nIMPORTANT: Create the hairstyle and costume entirely from the written description below. Do not require or rely on any additional reference images.\nHAIRSTYLE – SIGNATURE SILVER-WHITE HAIR\nReplace the person's original hairstyle with an elaborate silver-white hairstyle inspired by Nakroth's iconic in-game appearance.\n- Bright metallic silver-white hair.\n- Extremely voluminous, spiky and layered hairstyle.\n- Multiple large, sharp, outward-swept hair spikes on the top and both sides of the head.\n- Distinctive middle-parted hairstyle, with hair naturally divided into two sections.\n- Long, flowing side locks on BOTH sides of the face, extending down to the shoulders.\n- Two clearly visible long sections framing the cheeks and neck.\n- Additional layered strands flowing behind both ears.\n- Slightly messy, dynamic, luxurious anime-inspired hairstyle recreated with realistic human hair.\n- Every strand must look natural, detailed and physically realistic.\n- Do not make the hair short, flat, straight or a simple long wig.\nCOSTUME – NAKROTH DIMENSIONAL GUARDIAN\nReplace the person's original outfit with the complete signature costume:\n- Cropped black fitted blazer with a structured fashion silhouette.\n- Thin, elegant white piping outlining the blazer's lapels, front edges and pockets.\n- White dress shirt underneath.\n- Deep royal-blue necktie.\n- A distinctive metallic GOLD FOUR-POINT STAR ORNAMENT positioned at the tie knot. It must have four clearly defined pointed ends, NOT a triangle.\n- Light lavender-blue tailored trousers.\n- Black belt with a metallic buckle.\n- Decorative silver chains attached to both sides of the waist, hanging naturally over the trousers.\n- Small metallic clips and hanging accessories attached to the chains.\n- Black fingerless leather gloves with metallic studs and details.\n- Rolled-up or slightly visible white shirt cuffs beneath the black blazer sleeves.\nRecreate the exact recognizable color combination: black, white, royal blue, lavender-blue and gold.\nPHOTOREALISTIC COSPLAY QUALITY\nThe result must look like an actual person wearing an expensive, professionally tailored cosplay costume in a real-world photoshoot.\nReal human hair, realistic individual hair strands, natural fabric texture, detailed stitching, realistic leather gloves, authentic metallic accessories, natural shadows and professional fashion photography quality.\nThe result must NOT look like an anime drawing, cartoon, video game screenshot or CGI character.\nSTRICT ORIGINAL PHOTO PRESERVATION\nThis is an image EDITING task, NOT a new image generation task.\nPreserve the original photograph exactly:\n- Keep the person's original face and identity unchanged.\n- Do not modify facial features, eyes, nose, lips, jawline or skin.\n- Keep the original facial expression.\n- Keep the exact original body shape and proportions.\n- Keep the exact original pose and hand positions.\n- Keep the original camera angle and perspective.\n- Keep the exact original image dimensions and aspect ratio.\n- Keep the original crop and framing.\n- Keep the original background and every object in the environment.\n- Preserve the original lighting direction and photographic atmosphere.\nONLY change TWO things:\n1. The person's hairstyle.\n2. The person's clothing and accessories.\nDo not alter anything else.\nFINAL OUTPUT: The same person in the original photograph, with an extremely detailed, realistic silver-white Nakroth-inspired hairstyle featuring a center part and two long shoulder-length side locks, wearing the complete Nakroth Dimensional Guardian costume as a believable real-life cosplay."}),
        makePhotoboothFilter("ai_gojo_satoru", "Gojo Satoru cosplay", "https://locket.dinhduyvinh.tech/images/ai_gojo_satoru.png", ["#6366F1", "#A5B4FC"], "Hiệu Ứng AI 3D Hot 🔥", {filterType: "normal", overlay: true, sfSymbol: "sparkles", prompt: "Edit the provided reference image while strictly preserving its original framing and crop.\n\n**CRITICAL: ORIGINAL HALF-BODY COMPOSITION MUST REMAIN UNCHANGED.**\n\n- The original image is a HALF-BODY PORTRAIT.\n- Keep exactly the same half-body framing as the reference image.\n- Preserve the original crop, showing the character from the head down to the same waist/torso area as the original.\n- Do NOT extend the image downward.\n- Do NOT generate legs, knees, feet or full-body content.\n- Do NOT zoom out or change the camera distance.\n- Do NOT change the image aspect ratio or canvas dimensions.\n- Keep the exact original camera angle, perspective and character position.\n\n**COSPLAY TRANSFORMATION ONLY:**\n\nReplace the original person's hairstyle and clothing with a realistic Satoru Gojo cosplay:\n- Spiky silver-white hair.\n- Black blindfold covering both eyes.\n- Black high-collar Gojo uniform jacket.\n- Realistic wearable cosplay materials and natural fabric folds.\n\n**PRESERVE EVERYTHING ELSE:**\n- Original person's body shape and proportions.\n- Original shoulder width and arm positions.\n- Original posture and head position.\n- Original background and lighting.\n- Original image composition and boundaries.\n\n**FINAL OUTPUT:**\nA photorealistic half-body Satoru Gojo cosplay portrait with exactly the same crop, framing, dimensions and camera perspective as the original reference image.\n\nThis is a localized character appearance and outfit replacement, NOT a full-body reconstruction or image expansion."}),
        makePhotoboothFilter("ai_shopee_food", "Nhân Viên ShopeeFood 🛵", "https://locket.dinhduyvinh.tech/images/ai_shopee_food.png", ["#EE4D2D", "#FFA07A"], "Hiệu Ứng AI 3D Hot 🔥", {filterType: "normal", overlay: true, sfSymbol: "sparkles", prompt: "Edit the uploaded photograph. Transform the person into a realistic real-life ShopeeFood delivery employee wearing an authentic ShopeeFood rider uniform.\n\n**UNIFORM DETAILS:**\n- A vibrant orange ShopeeFood delivery jacket.\n- Signature bright orange color with white branding details.\n- ShopeeFood logo printed or embroidered clearly on the left chest.\n- Long-sleeved delivery jacket with a front zipper.\n- Matching orange delivery uniform shirt.\n- Dark navy or black trousers.\n- An orange ShopeeFood motorcycle helmet with recognizable white branding.\n- Optional orange ShopeeFood insulated delivery backpack with the official logo.\n\n**REALISTIC CLOTHING DETAILS:**\n- Natural fabric folds and realistic stitching.\n- Realistic zipper, collar, cuffs and jacket material.\n- Authentic motorcycle helmet with glossy reflections and chin strap.\n- The uniform must look genuinely worn by the person, not digitally pasted onto the body.\n- Accurate orange and white brand colors.\n\n**PRESERVE THE ORIGINAL PERSON:**\n- Keep the exact original face, identity, hairstyle and skin tone.\n- Preserve the original facial expression and body proportions.\n- Keep the original pose and hand gestures.\n- Only replace the clothing and add the ShopeeFood helmet and accessories.\n- Preserve the original background, camera angle and composition.\n\n**PHOTOGRAPHY STYLE:**\nUltra-photorealistic commercial photography, realistic human skin, natural lighting, professional DSLR quality, detailed fabric textures, authentic real-world appearance.\n\nNo cartoon, no anime, no sticker, no illustration, no white outline, no face replacement, no artificial CGI."}),
        makePhotoboothFilter("ai_rose_flower", "Ngậm Hoa Hồng", "https://locket.dinhduyvinh.tech/images/ai_rose_flower.png", ["#E11D48", "#FB7185"], "AI", { filterType: "normal", sfSymbol: "camera.macro", prompt: "Show the person in the photo with the exact same pose and background, but have them with a single rose in their mouth. If no person is present in the input, do not add anything to the output." }),
        makePhotoboothFilter("ai_shrek_ogre", "Tai Ogre Shrek", "https://locket.dinhduyvinh.tech/images/ai_shrek_ogre.png", ["#6C941D", "#BADA69"], "AI", { filterType: "normal", sfSymbol: "ear", prompt: "Show the person in the photo with the exact same pose and background, but transform them into Shrek with rounded ears, and rustic clothing while preserving the pose. Keep their hairstyle, but make it look natural in the Shrek style." }),
        makePhotoboothFilter("ai_superhero_cape", "Siêu Anh Hùng", "https://locket.dinhduyvinh.tech/images/ai_superhero_cape.png", ["#BA3036", "#E2B74D"], "AI", { filterType: "normal", sfSymbol: "shield.fill", prompt: "Show the person in the photo with the exact same pose and background, but suit them up like a superhero in a blue and red outfit with a flowing cape while keeping their pose and framing identical." }),
        makePhotoboothFilter("ai_spooky_ghost", "Bóng Ma Nhỏ", "https://locket.dinhduyvinh.tech/images/ai_spooky_ghost.png", ["#38BDF8", "#818CF8"], "AI", { filterType: "normal", sfSymbol: "moon.stars.fill", prompt: "Show the person in the photo with the exact same pose, expression, and background, but subtly insert a realistic-looking ghost somewhere in the background. If no person is present, do not add any people to the output." }),
        makePhotoboothFilter("ai_pirate_hat", "Mũ Cướp Biển", "https://locket.dinhduyvinh.tech/images/ai_pirate_hat.png", ["#0F172A", "#E2E8F0"], "AI", { filterType: "normal", sfSymbol: "flag.fill", prompt: "Show the person in the photo with the exact same pose and background, but dress them like a pirate from Pirates of the Caribbean while keeping their pose and facial expression identical." }),
        makePhotoboothFilter("ai_volcano_lava", "Núi Lửa Dung Nham", "https://locket.dinhduyvinh.tech/images/ai_volcano_lava.png", ["#EA580C", "#EF4444"], "AI", { filterType: "normal", sfSymbol: "flame.fill", prompt: "Show the person in the photo with the exact same pose, background, and facial expression, but replace the ground with molten lava, glowing magma cracks, and volcanic sparks while keeping them rooted to the spot. If no face is present, do not show any people in the output, only ever show people who were in the original input image." }),
        makePhotoboothFilter("ai_rain_storm", "Mưa Bão Sấm Sét", "https://locket.dinhduyvinh.tech/images/ai_rain_storm.png", ["#3B82F6", "#6366F1"], "AI", { filterType: "normal", sfSymbol: "cloud.bolt.rain.fill", prompt: "Retain the exact pose, facial features, distance, and background from the original image. Dress the subject as a character from the Wuthering Heights movie.\n\nFor Men: Dress them in the Jacob Elordi style with matching hair and outfit.\n\nFor Women: Dress them in the Margot Robbie style: A dramatic, historical-inspired red gown with a high-gloss, lacquered red skirt that is extremely voluminous and structured, forming a full bell shape from the waist down if that part is visible in the initial image. The skirt looks stiff and reflective, almost like polished vinyl. The bodice is corset-style, fitted tightly to the torso in the same glossy red material, with thin shoulder straps, a wide scoop rounded neckline, and the dress cinching the waist and creating a structured, corset-inspired silhouette WITHOUT visible boning, lacing or busks, and featuring a sheer billowing white long puffed sleeve shirt worn underneath with a scooped neckline for the white undershirt peeking out from behind the dress.\n\nConstraints: Do not modify the person's physical features, body shape, or positioning. Keep the framing and background 100% unchanged. If no person is present, return the image unaltered. Do not include Jacob Elordi or Margot Robbie themselves in the output image." }),
        makePhotoboothFilter("ai_fortnite_llama", "Llama Fortnite", "https://locket.dinhduyvinh.tech/images/ai_fortnite_llama.png", ["#A855F7", "#EC4899"], "AI", { filterType: "normal", sfSymbol: "gamecontroller.fill", prompt: "Show the person in the photo with the exact same pose, expression, and background, but make the entire scene look like it was rendered inside a video game, similar to the style of Fortnite. Show no extra overlays or text on top of the photo. If no person is present, do not add any people to the output." }),
        makePhotoboothFilter("ai_watercolor_art", "Tranh Màu Nước", "https://locket.dinhduyvinh.tech/images/ai_watercolor_art.png", ["#06B6D4", "#F43F5E"], "AI", { filterType: "normal", sfSymbol: "paintpalette.fill", prompt: "Show the person in the photo with the exact same pose, expression, and background, but render the entire scene as a watercolor painting with flowing brush strokes. If no person is present, do not add any people to the output." }),
        makePhotoboothFilter("ai_golden_hour", "Nắng Hoàng Hôn", "https://locket.dinhduyvinh.tech/images/ai_golden_hour.png", ["#F59E0B", "#F97316"], "AI", { filterType: "normal", sfSymbol: "sun.max.fill", prompt: "Show the person in the photo with the exact same pose, expression, and background, but make the scene look like it was captured during peak golden hour with warm sunlight and long shadows. If no person is present, do not add any people to the output." }),
        makePhotoboothFilter("ai_jungle_leaf", "Rừng Nhiệt Đới", "https://locket.dinhduyvinh.tech/images/ai_jungle_leaf.png", ["#16A34A", "#15803D"], "AI", { filterType: "normal", sfSymbol: "leaf.fill", prompt: "Show the person in the photo with the exact same pose, background, and facial expression, but with their background surroundings overgrown with plants in a seamless way. The person and their background should remain in the same positions. If no face is present, do not show any people in the output, only ever show people who were in the original input image." }),
        makePhotoboothFilter("ai_cute_zombie", "Zombie Chibi", "https://locket.dinhduyvinh.tech/images/ai_cute_zombie.png", ["#10B981", "#8B5CF6"], "AI", { filterType: "normal", sfSymbol: "person.fill", prompt: "Show the person in the photo with the exact same pose and background, but turn them into a zombie while keeping their pose and expression identical." }),
        makePhotoboothFilter("ai_fireworks", "Pháo Hoa Rực Rỡ", "https://locket.dinhduyvinh.tech/images/ai_fireworks.png", ["#EC4899", "#8B5CF6"], "AI", { filterType: "normal", overlay: false, sfSymbol: "sparkles", prompt: "Show the person in the photo with the exact same pose and background, but fill the scene with fireworks exploding in the night sky and reflecting colorful light onto the subject. Ensure the person is in the exact same pose and positioning within the frame. If no face is present, do not show any people in the output, only ever show people who were in the original input image." }),
        makePhotoboothFilter("ai_harry_potter", "Phù Thủy Hogwarts", "https://locket.dinhduyvinh.tech/images/ai_harry_potter.png", ["#78482C", "#D3A567"], "AI", { filterType: "normal", overlay: false, sfSymbol: "wand.and.stars", prompt: "Show the person in the photo with the exact same pose and background, but show them as a character from Harry Potter wearing a robe of one of the four houes. Keep the pose and framing identical and do not change the background." }),
        makePhotoboothFilter("ai_minecraft", "Minecraft 3D", "https://locket.dinhduyvinh.tech/images/ai_minecraft.png", ["#22C55E", "#0EA5E9"], "AI", { filterType: "normal", overlay: false, sfSymbol: "cube.fill", prompt: "Show the person in the photo with the exact same pose, expression, and background, but make everything in the scene look like it was created from Minecraft-style blocks and show people as Minecraft characters. If no person is present, do not add any people to the output." }),
        makePhotoboothFilter("ai_fire_flame", "Ngọn Lửa Rực Cháy", "https://locket.dinhduyvinh.tech/images/ai_fire_flame.png", ["#F97316", "#EAB308"], "AI", { filterType: "normal", overlay: false, sfSymbol: "flame.fill", prompt: "Show the persons in the photo with the exact same pose and background, but with a dramatic theatrical flame effect appearing just in front of the subject's face, as if they are performing a fantasy fire-breathing act, captured with a modern iPhone camera look.\n\nThe flame should appear as a staged visual effect, suspended in front of the mouth area without showing fire originating from inside the body. Keep the effect believable and cinematic, with a bright yellow-white core, orange and red edges, subtle motion blur, and gentle heat distortion in the nearby air.\n\nAdd a soft warm glow on nearby facial features and clothing, consistent with the flame's position, while preserving the original lighting of the scene. Do not show burns, smoke inhalation, injury, pain, damage, or distress. Do not alter the person's face, expression, identity, or pose.\n\nKeep the background, framing, depth of field, and image quality identical to the original, with the flame effect appearing as a safe staged performance element captured in-camera. Do not change the overall compsition of the photo, do not add new people to the photo, only show each person in the photo one time." }),
        makePhotoboothFilter("ai_giant_spider", "Nhện Khổng Lồ", "https://locket.dinhduyvinh.tech/images/ai_giant_spider.png", ["#73513B", "#C4A383"], "AI", { filterType: "normal", overlay: false, sfSymbol: "ant.fill", prompt: "Show the person in the photo with the exact same pose, expression, and background, but place a realistic spider perched on them somewhere, such as their shoulder or head. If no person is present, do not add any people to the output." }),
        makePhotoboothFilter("ai_ocean_underwater", "Thủy Cung Đại Dương", "https://locket.dinhduyvinh.tech/images/ai_ocean_underwater.png", ["#06B6D4", "#3B82F6"], "AI", { filterType: "normal", overlay: false, sfSymbol: "drop.fill", prompt: "Show the person in the photo with the exact same pose, background, and facial expression, but as if them and their surrounding environment was underwater. If no face is present, do not show any people in the output, only ever show people who were in the original input image." }),
        makePhotoboothFilter("ai_ufo_alien", "UFO & Alien", "https://locket.dinhduyvinh.tech/images/ai_ufo_alien.png", ["#10B981", "#8B5CF6"], "AI", { filterType: "normal", overlay: false, sfSymbol: "sparkles", prompt: "Show the person in the photo with the exact same pose and background, but show a subtle UFO hovering in the sky or an alien somewhere hidden somewhere in the user's background. If no face is present, do not show any people in the output, only ever show people who were in the original input image." }),
        makePhotoboothFilter("ai_sweet_hearts", "Sweet Hearts", "https://locket.dinhduyvinh.tech/images/ai_sweet_hearts.png", ["#E4B62F", "#FFF0A2"], "AI", { filterType: "cutout", sfSymbol: "sparkles" })
    ];
    var filter_groups = [
        { id: "group_photobooth", title: { en: "PhotoBooth 4 ảnh 📸" }, filter_ids: ["pb_khung4_merry_christmas", "pb_khung4_christmas_palette", "pb_khung4_happy_birthday", "pb_khung4_shin1", "pb_khung4_shin2", "pb_khung4_shin3", "pb_khung4_smile", "pb_khung4_scrapbook_do", "pb_khung4_inspire_arena", "pb_khung4_my_vault", "pb_khung4_cham_bi", "pb_khung4_cham_bi_den", "pb_khung4_likeble", "pb_khung4_razzle", "pb_khung4_your_title", "pb_khung4_soulmate_film", "pb_khung4_mimi", "pb_khung4_fairy_film", "pb_khung4_foto_lush", "pb_khung4_photoism", "pb_khung4_twinkle_booth", "pb_khung4_equinox", "pb_khung4_i_love_you", "pb_khung4_film", "pb_khung4_dream_cream", "pb_khung4_berry_days", "pb_khung4_scrapbook", "pb_khung4_so_cool", "pb_khung4_happy_snap", "pb_khung4_sky_diary", "pb_khung4_4cut", "pb_khung4_holo_4cut", "pb_khung4_scrapbook_ripped_4cut", "pb_khung4_ripped_paper_4cut", "pb_khung4_denim_ripped_2x2", "pb_khung4_dem_day_sao", "pb_khung4_vit_da_ngoai", "pb_khung4_bo_xanh", "pb_khung4_snoopy", "pb_khung4_hoi_ban_hoat_hinh", "pb_khung4_khung_long_pastel", "pb_khung4_bt21_tim", "pb_khung4_gau_cookie", "pb_khung4_capybara_tra_sua", "pb_khung4_pudding_vang", "pb_khung4_meo_tiem_banh", "pb_khung4_cinnamoroll_may_xanh", "pb_khung4_minions", "pb_khung4_tiem_banh_mat_ong", "pb_khung4_totoro_rung_xanh", "pb_khung4_kuromi_no_tim", "pb_khung4_cho_vang_cau_vong", "pb_khung4_conan_trinh_tham", "pb_khung4_tho_dau_tay", "pb_khung4_cinnamoroll_thien_than", "pb_khung4_bt21_do", "pb_khung4_capybara_ca_phe", "pb_khung4_my_melody_hong", "pb_khung4_loopy_tra_sua", "pb_khung4_koala_may_xanh", "pb_khung4_totoro", "pb_khung4_kuromi_tim", "pb_khung4_gau_ngu_trang_sao", "pb_khung4_bt21_party", "pb_khung4_scrapbook_xanh", "pb_khung4_vit_vuon_hoa", "pb_khung4_bts", "pb_khung4_conan", "pb_khung4_cortis", "pb_khung4_doraemon", "pb_khung4_dragon_ball", "pb_khung4_one_piece", "pb_khung4_thuy_thu_mat_trang", "pb_khung4_shin_cau_vong"] },
        { id: "group_photobooth_2", title: { en: "Hai Đứa Một Khung 💞" }, filter_ids: ["pb_khung2_Polaroid_vintage", "pb_khung2_merry_christmas", "pb_khung2_soulmate", "pb_khung2_love_postcard", "pb_khung2_camera_pic", "pb_khung2_anhdep", "pb_khung2_anhco", "pb_khung2_di_choi_thoi", "pb_khung2_thelove", "pb_khung2_outfit", "pb_khung2_thu_tinh", "pb_khung2_len_do", "pb_khung2_tin_nong", "pb_khung2_thang_ngay_ben_nhau", "pb_khung2_may_anh", "pb_khung2_ki_niem", "pb_khung2_khi_tinh_iu_den", "pb_khung2_khi_e_vang", "pb_khung2_dieu_em_uoc_ao", "pb_khung2_cinnamoroll"] },
        { id: "group_photobooth_3", title: { en: "Bộ Ba Bá Đạo 🤟" }, filter_ids: ["pb_khung3_christmas1", "pb_khung3_christmas2", "pb_khung3_christmas3", "pb_khung3_we_are_friend", "pb_khung3_taste_of_love", "pb_khung3_google", "pb_khung3_photo_iphone", "pb_khung3_polaroid2", "pb_khung3_da_bao", "pb_khung3_mothaiba", "pb_khung3_ngay_mai_tuoi_sang", "pb_khung3_memory", "pb_khung3_Vinyl", "pb_khung3_Polaroid", "pb_khung3_photodump", "pb_khung3_love_so_much", "pb_khung3_hoi_ban_than", "pb_khung3_hen_nha"] },
        { id: "group_trend_comment_tiktok", title: { en: "Cư Dân Mạng Nói Gì 💬" }, filter_ids: ["cmt_siuu", "cmt_phai_luon_tu_te", "cmt_chi_can_mot_vet_xuoc", "cmt_sontung", "cmt_locket", "cmt_binh_luan_minh_tue", "cmt_xinh", "cmt_posst", "cmt_flash", "cmt_duanma", "cmt_dichup", "cmt_chuano", "cmt_anhdim"] },
        { id: "group_camera_filters", title: { en: "Camera Filter 🎞️" }, filter_ids: ["photo_effect_co_dien", "photo_effect_dem_xanh", "photo_effect_film", "photo_effect_matte", "photo_effect_nhat", "photo_effect_pastel", "photo_effect_teal_va_cam", "photo_effect_trang_den", "photo_effect_tuong_phan", "photo_effect_am_ap", "photo_effect_mat_lanh", "photo_effect_am_mat_ong", "photo_effect_blue_hour", "photo_effect_film_nau", "photo_effect_hong_milk", "photo_effect_lo_sang_film", "photo_effect_matcha", "photo_effect_tim_y2k", "photo_effect_xanh_film"] },
        { id: "group_single_frame", title: { en: "Khung Viền Hot Trend 🖼️" }, filter_ids: ["pb_khung1_locket_camera", "pb_khung1_spotifyPC", "pb_khung1_spotify_hong", "pb_khung1_camfuji", "pb_khung1_menu_ios", "pb_khung1_iphone", "pb_khung1_tivi", "pb_khung1_the_gioi_cua_2_ta", "pb_khung1_Camera_iPhone", "pb_khung1_khong_buong", "pb_khung1_selflove", "pb_khung1_thu_tinh", "pb_khung1_ptb", "pb_khung1_oi_tinh_yeu", "pb_khung1_card", "pb_khung1_love_e_nhiu", "pb_khung1_ki_niem_tuoi_dep", "pb_khung1_ins", "pb_khung1_hoi_chieu_troi_mua", "pb_khung1_dia", "pb_khung1_chuong_cuoi", "pb_khung1_maytinh", "pb_khung1_mat_tin_hieu"] },
        { id: "group_trend", title: { en: "Trend Hot 🔥" }, filter_ids: ["trend_gay_meter", "weekday_depth", "pb_khung1_chua_som", "trend_bang_tin_khan", "trend_ve_giu_xe", "trend_vo_hoc_sinh", "trend_giao_vien_cham_bai", "trend_nhiem_vu_hom_nay_la", "trend_hoa_don_di_choi", "trend_binh_luan_duoc_ghim", "trend_camera_an_ninh", "trend_thong_bao_ngan_hang", "trend_chat_nhom_leak"] },
        { id: "group_mood_quotes", title: { en: "Tâm Trạng & Cà Khịa 💬" }, filter_ids: ["pb_khung1_khong_can_ai_duyet", "pb_khung1_ban_la_gi_ma_toi_phai_ban_tam", "pb_khung1_ong_troi_that_bat_cong", "pb_khung1_yeu_giau_chu_co_phai_yeu_dau_dau_ma_doi_ghen", "pb_khung1_me_con_dien", "pb_khung1_thieu_vang_ngot_ngao_cua_em", "pb_khung1_loi_cua_tao_a", "pb_khung1_tao_song_sao", "pb_khung1_tuyet_vong", "pb_khung1_dech_quan_tam", "pb_khung1_met5_ma_cai_toi5m1", "pb_khung1_99_phan_tram_co_the_la_ngai", "pb_khung1_noi_ko_buon_la_noi_doi", "pb_khung1_mo_long_lan_nao_la_du_ma_lan_do", "pb_khung1_uoc_gi_buon_cung_ra_tien", "pb_khung1_han_toan", "pb_khung1_khong_tin_dan_ong", "pb_khung1_kho_do_danh", "pb_khung1_xinh_gai_tinh_quai", "pb_khung1_song_basic", "pb_khung1_hoang_tu_am_o"] },
        { id: "group_goofy", title: { en: "Rạp Xiếc Trung Ương 🤪" }, filter_ids: ["pb_khung1_meme_meo", "pb_khung1_faker", "pb_khung3_fruit", "pb_khung1_mona_lisa", "pb_khung2_monkey", "pb_khung1_messi", "pb_khung1_ronaldo_cup", "pb_khung2_cuoi_vespa", "pb_khung1_anh_tho", "pb_khung1_the_hinh", "pb_khung1_matmoc"] },
        { id: "group_frames", title: { en: "Khung Xinh Hết Cứu 🎀" }, filter_ids: ["pb_khung1_color", "pb_khung1_meow", "pb_khung1_sao_nen_trang", "pb_khung1_nen_mua", "pb_khung1_cute", "pb_khung1_luffy", "pb_khung1_frame_classic_pb", "pb_khung1_hello_kitty_pastel_ngot_ngao", "pb_khung1_hello_kitty_hong_pastel", "pb_khung1_pastel_vien_ren", "pb_khung1_hoa_pastel_vien_xanh_xinh", "pb_khung1_spiderred", "pb_khung1_khong_gian_xanh_pastel", "pb_khung1_ngoi_sao_hong_pastel", "pb_khung1_pastel_so_hai_cau", "pb_khung1_shin_chan", "pb_khung1_anh_hellokitty_v_sao", "pb_khung1_xanh_tay_sao_vang", "pb_khung1_sinh_nhat_hello_kitty", "pb_khung1_y2k_silver_holo", "pb_khung1_denim_ripped", "pb_khung1_film_nostalgia", "pb_khung1_photobooth_cute"] },
        { id: "group_hot_ai_3d", title: { en: "AI 3D Hot 🔥" }, filter_ids: ["ai_tai_tho", "ai_mu_ngu_khoc", "ai_jollibee", "ai_nak_ve_than", "ai_gojo_satoru", "ai_shopee_food", "ai_fireworks", "ai_harry_potter", "ai_minecraft", "ai_fire_flame", "ai_giant_spider", "ai_ocean_underwater", "ai_ufo_alien", "ai_sweet_hearts", "ai_volcano_lava", "ai_rain_storm", "ai_fortnite_llama", "ai_watercolor_art", "ai_golden_hour"] },
        { id: "group_mischief", title: { en: "Hài hước" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows", "ai_spooky_ghost", "ai_cute_zombie"] },
        { id: "group_appearance", title: { en: "Ngoại hình" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows", "ai_rose_flower", "ai_jungle_leaf"] },
        { id: "group_event", title: { en: "Sự kiện" }, filter_ids: ["pb_khung1_locket", "slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
        { id: "group_cute", title: { en: "Dễ thương" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
        { id: "group_costume", title: { en: "Trang phục" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown", "ai_shrek_ogre", "ai_superhero_cape", "ai_pirate_hat"] },
        { id: "group_holiday", title: { en: "Ngày lễ" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "ai_sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] },
    ];
    Object.assign(obj.entries, {
        camera: JSON.stringify({
            gold_max_duration: 60.0,
            max_duration: 60.0,
            ultra_wide: true,
            volume_button: true,
            flash_button: true,
            telephoto: true,
            srgb: true,
            lanczos: true,
            quality_mbps: 0.6,
        }),
        camera_roll: JSON.stringify({
            gold_max_duration: 60.0,
            video_max_duration: 60.0,
            max_duration: 60.0,
            trim_max_duration: 60.0,
            camera_roll_max_duration: 60.0,
            quality_mbps: 0.6,
            flash_button: true
        }),
        live_photos: JSON.stringify({
            capture: true,
            video: true,
            viewing: true,
            catch_up: true,
            widget_playback: true,
            widget_looping_mode: "unseen"
        }),
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true,
            show_filter_button: true,
            sheet_enabled: true,
            open_sheet_immediately: true,
            // reference_image_attachment_enabled: true,
            sheet_filters: filter_groups,
            filter_groups: filter_groups,
            picker_filters: [
                // PhotoBooth 4 ảnh 📸
                "pb_khung4_merry_christmas", "pb_khung4_christmas_palette", "pb_khung4_happy_birthday", "pb_khung4_shin1", "pb_khung4_shin2", "pb_khung4_shin3",
                "pb_khung4_smile", "pb_khung4_scrapbook_do", "pb_khung4_inspire_arena", "pb_khung4_my_vault", "pb_khung4_cham_bi", "pb_khung4_cham_bi_den",
                "pb_khung4_likeble", "pb_khung4_razzle", "pb_khung4_your_title", "pb_khung4_soulmate_film",
                "pb_khung4_mimi", "pb_khung4_fairy_film",
                "pb_khung4_equinox", "pb_khung4_twinkle_booth", "pb_khung4_photoism", "pb_khung4_foto_lush",
                "pb_khung4_i_love_you", "pb_khung4_film", "pb_khung4_dream_cream", "pb_khung4_berry_days", "pb_khung4_scrapbook", "pb_khung4_so_cool",
                "pb_khung4_happy_snap", "pb_khung4_sky_diary", "pb_khung4_4cut", "pb_khung4_holo_4cut", "pb_khung4_scrapbook_ripped_4cut",
                "pb_khung4_ripped_paper_4cut", "pb_khung4_denim_ripped_2x2",
                // Hai Đứa Một Khung 💞
                "pb_khung2_Polaroid_vintage", "pb_khung2_merry_christmas",
                "pb_khung2_soulmate", "pb_khung2_camera_pic", "pb_khung2_love_postcard",
                "pb_khung2_anhdep", "pb_khung2_anhco", "pb_khung2_di_choi_thoi", "pb_khung2_thelove", "pb_khung2_outfit",
                "pb_khung2_thu_tinh", "pb_khung2_len_do", "pb_khung2_tin_nong", "pb_khung2_thang_ngay_ben_nhau", "pb_khung2_may_anh",
                "pb_khung2_ki_niem", "pb_khung2_khi_tinh_iu_den", "pb_khung2_khi_e_vang", "pb_khung2_dieu_em_uoc_ao",
                // Bộ Ba Bá Đạo 🤟
                "pb_khung3_christmas1", "pb_khung3_christmas2", "pb_khung3_christmas3", "pb_khung3_we_are_friend", "pb_khung3_taste_of_love", "pb_khung3_google",
                "pb_khung3_photo_iphone", "pb_khung3_polaroid2", "pb_khung3_da_bao",
                "pb_khung3_mothaiba",
                "pb_khung3_ngay_mai_tuoi_sang", "pb_khung3_memory", "pb_khung3_Vinyl", "pb_khung3_Polaroid", "pb_khung3_photodump",
                "pb_khung3_love_so_much", "pb_khung3_hoi_ban_than", "pb_khung3_hen_nha",
                // Cư Dân Mạng Nói Gì 💬
                "cmt_siuu", "cmt_sontung", "cmt_locket", "cmt_binh_luan_minh_tue", "cmt_xinh",
                "cmt_posst", "cmt_flash", "cmt_duanma", "cmt_dichup", "cmt_chuano",
                "cmt_anhdim", "cmt_phai_luon_tu_te", "cmt_chi_can_mot_vet_xuoc",
                // Camera Filter 🎞️
                "photo_effect_co_dien", "photo_effect_dem_xanh", "photo_effect_film", "photo_effect_matte", "photo_effect_nhat",
                "photo_effect_pastel", "photo_effect_teal_va_cam", "photo_effect_trang_den", "photo_effect_tuong_phan", "photo_effect_am_ap",
                "photo_effect_mat_lanh", "photo_effect_am_mat_ong", "photo_effect_blue_hour", "photo_effect_film_nau", "photo_effect_hong_milk",
                "photo_effect_lo_sang_film", "photo_effect_matcha", "photo_effect_tim_y2k", "photo_effect_xanh_film",
                // Khung Viền Hot Trend 🖼️
                "pb_khung1_locket_camera", "pb_khung1_spotifyPC", "pb_khung1_spotify_hong", "pb_khung1_camfuji", "pb_khung1_menu_ios",
                "pb_khung1_iphone", "pb_khung1_tivi", "pb_khung1_the_gioi_cua_2_ta", "pb_khung1_Camera_iPhone", "pb_khung1_khong_buong",
                "pb_khung1_selflove", "pb_khung1_thu_tinh", "pb_khung1_ptb", "pb_khung1_oi_tinh_yeu", "pb_khung1_card",
                "pb_khung1_love_e_nhiu", "pb_khung1_ki_niem_tuoi_dep", "pb_khung1_ins", "pb_khung1_hoi_chieu_troi_mua", "pb_khung1_dia",
                "pb_khung1_chuong_cuoi", "pb_khung1_maytinh", "pb_khung1_mat_tin_hieu",
                // Trend Hot 🔥
                "trend_gay_meter",
                "weekday_depth", "pb_khung1_chua_som",
                "trend_bang_tin_khan", "trend_ve_giu_xe", "trend_vo_hoc_sinh", "trend_giao_vien_cham_bai", "trend_nhiem_vu_hom_nay_la",
                "trend_hoa_don_di_choi", "trend_binh_luan_duoc_ghim", "trend_camera_an_ninh", "trend_thong_bao_ngan_hang",
                "trend_chat_nhom_leak",
                // Rạp Xiếc Trung Ương 🤪
                "pb_khung1_meme_meo", "pb_khung1_faker", "pb_khung3_fruit", "pb_khung1_mona_lisa", "pb_khung2_monkey", "pb_khung1_ronaldo_cup", "pb_khung1_messi",
                "pb_khung2_cuoi_vespa",
                "pb_khung1_the_hinh", "pb_khung1_anh_tho", "pb_khung1_matmoc",
                // Khung Xinh Hết Cứu 🎀
                "pb_khung1_color",
                "pb_khung1_meow", "pb_khung1_sao_nen_trang", "pb_khung1_nen_mua", "pb_khung1_cute", "pb_khung1_luffy", "pb_khung1_frame_classic_pb", "pb_khung1_hello_kitty_pastel_ngot_ngao",
                "pb_khung1_hello_kitty_hong_pastel", "pb_khung1_pastel_vien_ren", "pb_khung1_hoa_pastel_vien_xanh_xinh", "pb_khung1_spiderred",
                "pb_khung1_khong_gian_xanh_pastel", "pb_khung1_ngoi_sao_hong_pastel", "pb_khung1_pastel_so_hai_cau", "pb_khung1_shin_chan",
                "pb_khung1_anh_hellokitty_v_sao", "pb_khung1_xanh_tay_sao_vang", "pb_khung1_sinh_nhat_hello_kitty", "pb_khung1_y2k_silver_holo",
                "pb_khung1_denim_ripped", "pb_khung1_film_nostalgia", "pb_khung1_photobooth_cute",
                // Tâm Trạng & Cà Khịa 💬
                "pb_khung1_khong_can_ai_duyet", "pb_khung1_ban_la_gi_ma_toi_phai_ban_tam",
                "pb_khung1_ong_troi_that_bat_cong", "pb_khung1_yeu_giau_chu_co_phai_yeu_dau_dau_ma_doi_ghen", "pb_khung1_me_con_dien", "pb_khung1_thieu_vang_ngot_ngao_cua_em",
                "pb_khung1_loi_cua_tao_a", "pb_khung1_tao_song_sao", "pb_khung1_tuyet_vong", "pb_khung1_dech_quan_tam",
                "pb_khung1_met5_ma_cai_toi5m1", "pb_khung1_99_phan_tram_co_the_la_ngai", "pb_khung1_noi_ko_buon_la_noi_doi", "pb_khung1_mo_long_lan_nao_la_du_ma_lan_do",
                "pb_khung1_uoc_gi_buon_cung_ra_tien", "pb_khung1_han_toan", "pb_khung1_khong_tin_dan_ong", "pb_khung1_kho_do_danh",
                "pb_khung1_xinh_gai_tinh_quai", "pb_khung1_song_basic", "pb_khung1_hoang_tu_am_o",
                // AI 3D Hot 🔥
                "ai_tai_tho", "ai_mu_ngu_khoc", "ai_jollibee", "ai_nak_ve_than", "ai_gojo_satoru", "ai_shopee_food",
                "ai_fireworks", "ai_harry_potter", "ai_minecraft", "ai_fire_flame", "ai_giant_spider",
                "ai_ocean_underwater", "ai_ufo_alien", "ai_sweet_hearts", "ai_volcano_lava", "ai_rain_storm",
                "ai_fortnite_llama", "ai_watercolor_art", "ai_golden_hour",
                // Hài hước
                "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
                "ai_spooky_ghost", "ai_cute_zombie",
                // Ngoại hình
                "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
                "tatted", "mohawk", "braces", "ai_rose_flower", "ai_jungle_leaf",
                // Sự kiện
                "pb_khung1_locket", "slimed", "princess", "disco_lights", "cash_money",
                "happy_birthday",
                // Dễ thương
                "cutesy", "sticker_face", "flower_crown", "love_bug",
                // Trang phục
                "wedding", "cowboy_cowgirl", "giraffe", "clown", "ai_shrek_ogre",
                "ai_superhero_cape", "ai_pirate_hat",
                // Ngày lễ
                "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face",
                "elf_cutout", "santa_cutout", "frosty",
                // New photobooth templates follow all existing picker IDs.
                "pb_khung4_dem_day_sao", "pb_khung4_vit_da_ngoai", "pb_khung4_bo_xanh", "pb_khung4_snoopy",
                "pb_khung4_hoi_ban_hoat_hinh", "pb_khung4_khung_long_pastel", "pb_khung4_bt21_tim", "pb_khung4_gau_cookie",
                "pb_khung4_capybara_tra_sua", "pb_khung4_pudding_vang", "pb_khung4_meo_tiem_banh", "pb_khung4_cinnamoroll_may_xanh",
                "pb_khung4_minions", "pb_khung4_tiem_banh_mat_ong", "pb_khung4_totoro_rung_xanh", "pb_khung4_kuromi_no_tim",
                "pb_khung4_cho_vang_cau_vong", "pb_khung4_conan_trinh_tham", "pb_khung4_tho_dau_tay", "pb_khung4_cinnamoroll_thien_than",
                "pb_khung4_bt21_do", "pb_khung4_capybara_ca_phe", "pb_khung4_my_melody_hong", "pb_khung4_loopy_tra_sua",
                "pb_khung4_koala_may_xanh", "pb_khung4_totoro", "pb_khung4_kuromi_tim", "pb_khung4_gau_ngu_trang_sao",
                "pb_khung4_bt21_party", "pb_khung4_scrapbook_xanh", "pb_khung2_cinnamoroll", "pb_khung4_vit_vuon_hoa",
                "pb_khung4_bts", "pb_khung4_conan", "pb_khung4_cortis", "pb_khung4_doraemon",
                "pb_khung4_dragon_ball", "pb_khung4_one_piece", "pb_khung4_thuy_thu_mat_trang", "pb_khung4_shin_cau_vong",

            ],
            remote_filters: [
                ...AIFilters,
                ...fourFrameFilters,
                ...commentTikTok,
                ...photobooth2Filters,
                ...photobooth3Filters,
                ...singleFrameFilters,
                ...moodFrameFilters,
                ...CameraFilters,
                // New templates remain after all existing remote filters.
                makePhotoboothFilter("pb_khung4_dem_day_sao", "Đêm Đầy Sao", "https://locket.dinhduyvinh.tech/images/pb_khung4_dem_day_sao.png", ["#204C9A", "#F4CB4D"], "PhotoBooth 4 ảnh", { sfSymbol: "moon.stars.fill" }),
                makePhotoboothFilter("pb_khung4_vit_da_ngoai", "Vịt Đi Dã Ngoại", "https://locket.dinhduyvinh.tech/images/pb_khung4_vit_da_ngoai.png", ["#E5B35B", "#B2D790"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_bo_xanh", "Bơ Xanh Mơ Màng", "https://locket.dinhduyvinh.tech/images/pb_khung4_bo_xanh.png", ["#99B65A", "#F2E7A2"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_snoopy", "Snoopy Và Những Người Bạn", "https://locket.dinhduyvinh.tech/images/pb_khung4_snoopy.png", ["#556D80", "#F6DC9B"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_hoi_ban_hoat_hinh", "Hội Bạn Hoạt Hình", "https://locket.dinhduyvinh.tech/images/pb_khung4_hoi_ban_hoat_hinh.png", ["#EEA5BB", "#A0C7F0"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_khung_long_pastel", "Khủng Long Pastel", "https://locket.dinhduyvinh.tech/images/pb_khung4_khung_long_pastel.png", ["#B99ED8", "#BEDBBA"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_bt21_tim", "BT21 Disco Tím", "https://locket.dinhduyvinh.tech/images/pb_khung4_bt21_tim.png", ["#9F85DC", "#8EB8F6"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_gau_cookie", "Gấu Bánh Cookie", "https://locket.dinhduyvinh.tech/images/pb_khung4_gau_cookie.png", ["#B9793E", "#F5D79B"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_capybara_tra_sua", "Capybara Trà Sữa", "https://locket.dinhduyvinh.tech/images/pb_khung4_capybara_tra_sua.png", ["#BD8969", "#F7D8BB"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_pudding_vang", "Tiệm Pudding Vàng", "https://locket.dinhduyvinh.tech/images/pb_khung4_pudding_vang.png", ["#D6A447", "#FFE4A0"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_meo_tiem_banh", "Tiệm Bánh Mèo Mơ", "https://locket.dinhduyvinh.tech/images/pb_khung4_meo_tiem_banh.png", ["#DC9971", "#F9DDB2"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_cinnamoroll_may_xanh", "Cinnamoroll Mây Xanh", "https://locket.dinhduyvinh.tech/images/pb_khung4_cinnamoroll_may_xanh.png", ["#75B6DF", "#D5EBFF"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_minions", "Minions Tinh Nghịch", "https://locket.dinhduyvinh.tech/images/pb_khung4_minions.png", ["#E5C545", "#8CB4D6"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_tiem_banh_mat_ong", "Tiệm Bánh Mật Ong", "https://locket.dinhduyvinh.tech/images/pb_khung4_tiem_banh_mat_ong.png", ["#D79D52", "#FFE2A1"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_totoro_rung_xanh", "Totoro Rừng Xanh", "https://locket.dinhduyvinh.tech/images/pb_khung4_totoro_rung_xanh.png", ["#8EAA61", "#DEE7B5"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_kuromi_no_tim", "Kuromi Nơ Tím", "https://locket.dinhduyvinh.tech/images/pb_khung4_kuromi_no_tim.png", ["#8B64A1", "#E3BDED"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_cho_vang_cau_vong", "Cún Vàng Cầu Vồng", "https://locket.dinhduyvinh.tech/images/pb_khung4_cho_vang_cau_vong.png", ["#D4B74C", "#FFF0A6"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_conan_trinh_tham", "Conan Thám Tử Nhí", "https://locket.dinhduyvinh.tech/images/pb_khung4_conan_trinh_tham.png", ["#274C82", "#D6E5F4"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_tho_dau_tay", "Thỏ Dâu Tây", "https://locket.dinhduyvinh.tech/images/pb_khung4_tho_dau_tay.png", ["#DF8CA2", "#FFE0E8"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_cinnamoroll_thien_than", "Cinnamoroll Thiên Thần", "https://locket.dinhduyvinh.tech/images/pb_khung4_cinnamoroll_thien_than.png", ["#E6A1C7", "#F9D7EE"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_bt21_do", "BT21 Rực Rỡ", "https://locket.dinhduyvinh.tech/images/pb_khung4_bt21_do.png", ["#DB5260", "#F7CB6A"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_capybara_ca_phe", "Capybara Tiệm Cà Phê", "https://locket.dinhduyvinh.tech/images/pb_khung4_capybara_ca_phe.png", ["#AF805D", "#F1D9B9"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_my_melody_hong", "My Melody Hồng", "https://locket.dinhduyvinh.tech/images/pb_khung4_my_melody_hong.png", ["#DC84AD", "#F8CFE2"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_loopy_tra_sua", "Loopy Trà Sữa", "https://locket.dinhduyvinh.tech/images/pb_khung4_loopy_tra_sua.png", ["#D991AB", "#F9CEDB"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_koala_may_xanh", "Koala Ngủ Trên Mây", "https://locket.dinhduyvinh.tech/images/pb_khung4_koala_may_xanh.png", ["#8FAFD7", "#D8E7FC"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_totoro", "Totoro Khu Vườn Nhỏ", "https://locket.dinhduyvinh.tech/images/pb_khung4_totoro.png", ["#91A766", "#E1E7BA"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_kuromi_tim", "Kuromi Tím Mộng Mơ", "https://locket.dinhduyvinh.tech/images/pb_khung4_kuromi_tim.png", ["#A377C2", "#EDCEFA"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_gau_ngu_trang_sao", "Gấu Ngủ Trăng Sao", "https://locket.dinhduyvinh.tech/images/pb_khung4_gau_ngu_trang_sao.png", ["#A899D6", "#FCEDB6"], "PhotoBooth 4 ảnh", { sfSymbol: "moon.stars.fill" }),
                makePhotoboothFilter("pb_khung4_bt21_party", "BT21 Party", "https://locket.dinhduyvinh.tech/images/pb_khung4_bt21_party.png", ["#BE88C0", "#F5DBAC"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_scrapbook_xanh", "Scrapbook Xanh Dịu", "https://locket.dinhduyvinh.tech/images/pb_khung4_scrapbook_xanh.png", ["#9DAEC9", "#E2EAF4"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung2_cinnamoroll", "Cinnamoroll Đôi Mình", "https://locket.dinhduyvinh.tech/images/pb_khung2_cinnamoroll.png", ["#99B7D5", "#F4DCB0"], "PhotoBooth 2 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_vit_vuon_hoa", "Vịt Trong Vườn Hoa", "https://locket.dinhduyvinh.tech/images/pb_khung4_vit_vuon_hoa.png", ["#A8C576", "#F7DAAC"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_bts", "BTS Tím Yêu Thương", "https://locket.dinhduyvinh.tech/images/pb_khung4_bts.png", ["#A67AD1", "#EAD6FC"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_conan", "Conan Phá Án", "https://locket.dinhduyvinh.tech/images/pb_khung4_conan.png", ["#28578C", "#F0CF7B"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_cortis", "CORTIS Xanh Thanh Xuân", "https://locket.dinhduyvinh.tech/images/pb_khung4_cortis.png", ["#9AB7DB", "#E4F0FF"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_doraemon", "Doraemon Và Hội Bạn", "https://locket.dinhduyvinh.tech/images/pb_khung4_doraemon.png", ["#62ACDB", "#C6E8FA"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_dragon_ball", "Dragon Ball Bùng Nổ", "https://locket.dinhduyvinh.tech/images/pb_khung4_dragon_ball.png", ["#E49C36", "#9DD8E5"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_one_piece", "One Piece Ra Khơi", "https://locket.dinhduyvinh.tech/images/pb_khung4_one_piece.png", ["#DAAA58", "#C5E2F1"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_thuy_thu_mat_trang", "Thủy Thủ Mặt Trăng", "https://locket.dinhduyvinh.tech/images/pb_khung4_thuy_thu_mat_trang.png", ["#E69ABF", "#F9D9EB"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
                makePhotoboothFilter("pb_khung4_shin_cau_vong", "Shin Cậu Bé Bút Chì", "https://locket.dinhduyvinh.tech/images/pb_khung4_shin_cau_vong.png", ["#D8AF4A", "#BFDDA8"], "PhotoBooth 4 ảnh", { sfSymbol: "camera.filters" }),
            ],
            // promo: JSON.stringify({
            //     uid: "us_rollout",
            //     title: { en: "Tạo diện mạo >,<" }
            // }),
        }),
        camera_filter_fetch_cache_max_age_seconds: "0",
        capture_classification_config: JSON.stringify({ detection: true, debug_caption: false, expanded_sheet_legacy_support: true, display_reaction_suggestions: true }),
        camera_roll_preview_enabled: "true",
        camera_roll_video_enabled: "true",
        camera_roll_video_upload_enabled: "true",
        internal_camera_roll_video_upload_enabled: "true",
        longer_camera_roll_videos_enabled: "true",
        video_sound_enabled: "true",
        microphone_enabled: "true",
        camera_microphone_enabled: "true",
        audio_session_deactivation_enabled: "true",
        zoom_enabled: "true",
        upload_main: "false",
        upload_main_image_quality: "0.6",
        upload_main_image_size: "1440",
        upload_thumbnail_image_quality: "0.8",
        upload_thumbnail_image_size: "1020"
    });

    // ============================================================
    // 4. BẠN BÈ, GIỚI HẠN & ĐỀ XUẤT KẾT BẠN
    // ============================================================
    Object.assign(obj.entries, {
        max_friends_count: "999999999",
        friend_limit_mode: "0",
        soft_friend_limit_threshold_count: "999999999",
        show_friend_limit_on_cam: "false",
        signup_max_friends_count: "999999999",
        celebrity_inbox_limit: "999999999",
        celebrity_inbox_enabled: "true",
        celebrity_vip_qr_redemption_enabled: "true",
        friend_limit_geo_override: JSON.stringify({ experiments: {}, area_code_overrides: {} }),
        friends_sheet_locket_count_config: JSON.stringify({ items: [ { threshold: 0, icon_name: "heart" }, { threshold: 1, icon_name: "heart.fill" }, { threshold: 10, emoji: "🤍" }, { threshold: 100, emoji: "💛" }, { threshold: 500, emoji: "❤️‍🔥" }, { threshold: 1000, emoji: "🌟🫶🌟" }, { threshold: 2000, emoji: "✨💟✨" }, { threshold: 5000, emoji: "⚡️😵‍💫⚡" }, { threshold: 10000, emoji: "✨⚡️😱⚡✨" } ]}),
        friend_locket_count_config: JSON.stringify({ items: [ { threshold: 0, icon_name: "heart" }, { threshold: 1, icon_name: "heart.fill" }, { threshold: 10, emoji: "🤍" }, { threshold: 100, emoji: "💛" }, { threshold: 500, emoji: "❤️‍🔥" }, { threshold: 1000, emoji: "✨💗✨" }, { threshold: 2000, emoji: "✨️⭐️✨" }, { threshold: 5000, emoji: "✨💎✨" }, { threshold: 10000, emoji: "✨🔐💛✨" } ]}),
        new_friends_monitoring_enabled: "true",
        improved_friend_suggestions: "true",
        show_friend_suggestions_by_default: "true",
        emoji_friend_suggestions: "true",
        friend_suggestions_v2: "true",
        prompt_contact_permissions_on_search: "true",
        populate_phone_numbers_from_suggest_friends: "true",
        hide_friends_enabled: "true",
        hide_invite_links: "false",
        hide_skip_contacts: "true",
        show_all_contacts: "true",
        show_invite_suggestions: "true",
        show_no_friends_bottom_sheet: "false",
        signup_allow_skip_add_friends: "true",
        signup_custom_profile_picture: "true",
        user_data_export_enabled: "true",
        username_suggestions_enabled: "true",
    });

    // ============================================================
    // 5. MOMENTS, STREAK, CHAT & TƯƠNG TÁC
    // ============================================================
    try {
        var streak = JSON.parse(obj.entries.streak_config || "{}");
        streak.minimum_recovery_count = 0;
        streak.minimum_display_count = 0;
        obj.entries.streak_config = JSON.stringify(streak);
    } catch (e) {}

    Object.assign(obj.entries, {
        daily_reminder_config: JSON.stringify({
            is_time_sensitive: true,
            items: [
                {
                    day: 1,
                    title_string: {en: "Lên hình đi ba, Locket mốc rồi 💛"},
                    streak_body_string: {en: "Chụp lẹ cứu chuỗi 🔥#streak#. Mất rồi đừng đổ tại app nha."},
                    body_string: {en: "Chụp đại đi, bạn mày coi Locket chứ có chấm thi hoa hậu đâu ⭐️"},
                    body_string_plural: {en: "Chụp đại đi, bạn mày coi Locket chứ có chấm thi hoa hậu đâu ⭐️"}
                },
                {
                    day: 3,
                    hour: 10,
                    title_string: {en: "Ủa, ghost luôn cả bạn bè hả? 👻"},
                    body_string: {en: "Im hơi #day# ngày rồi. Gửi tấm ảnh cho tụi nó biết mày vẫn online coi."},
                    body_string_plural: {en: "Im hơi #day# ngày rồi. Gửi tấm ảnh cho tụi nó biết mày vẫn online coi."}
                },
                {
                    day: 7,
                    hour: 19,
                    title_string: {en: "Bạn mày sắp đăng bài tìm người rồi 💛"},
                    body_string: {en: "Mất tích #day# ngày. Comeback bằng một tấm selfie, khỏi cần họp báo."},
                    body_string_plural: {en: "Mất tích #day# ngày. Comeback bằng một tấm selfie, khỏi cần họp báo."}
                },
                {
                    day: 14,
                    hour: 10,
                    title_string: {en: "Ủa, tải app về để trang trí màn hình hả? 🫶"},
                    body_string: {en: "#day# ngày chưa chụp. Bấm một tấm cho cái icon vàng có việc làm coi."},
                    body_string_plural: {en: "#day# ngày chưa chụp. Bấm một tấm cho cái icon vàng có việc làm coi."}
                }
            ]
        })
    });

    Object.assign(obj.entries, {
        moment_views_enabled: "true",
        moment_views_v2: "true",
        record_moment_views: "true",
        notify_moment_views: "true",
        get_moment_views_as_cloud_function: "true",
        moment_reactions_v2: "true",
        chat_reactions_enabled: "true",
        conversation_reactions: "true",
        typing_indicators_enabled: "true",
        unsend_message_enabled: "true",
        reply_prototype_enabled: "true",
        messages_integration: "true",
        conversations_enabled: "true",
        fetch_moments_in_conversation: "true",
        hide_chat_button: "false",
        groups_enabled: "true",
        group_contact_invites_enabled: "true",
        groups_onboarding_accept_invite_preview_enabled: "true",
        group_scrapbook_config: JSON.stringify({
            enabled: true,
            moment_limit: 999999999,
            default_layout: {
                show_member_joined: true,
                parallax_percentage: 50,
                is_device_tilt_enabled: false,
                cutout_percentage: 100
            },
            photos_button_enabled: true
        }),
        chat_hyperlink_enabled_mode: "always_enabled",
        send_to_self_only_mode: "always_enabled",
        time_travel_rewind_v2_enabled: "true",
        conversation_drafts_enabled: "1",
        calendar_delete_moment_enabled: "true",
        calendar_rewind_enabled: "false",
        locket_yearbook_story_sharing_encouraged: "true",
        rollcall_enabled: "true",
        rollcall_comment_actions: "true",
        rollcall_profile_button: "true",
        rollcall_prompt_export_after_share: "true",
        rollcall_confirm_skip_tagging: "false",
        rollcall_tap_to_tag_enabled: "false",
        moment_upload_queue_persistence_v2: "1",
    });

    // ============================================================
// ============================================================
// 6. WIDGET SỰ KIỆN MỚI, KHUNG HOÀNG GIA & BẬT ĐỊA CHỈ + FOCUS
// ============================================================
var dailyFrames = {
        1: { name: "mon", uid: "frame_mon_galaxy_cat", url: "https://i.ibb.co/84j69JnV/frame-mon-640.png" },
        2: { name: "tue", uid: "frame_tue_mecha_dragon", url: "https://i.ibb.co/fVQvW41Z/frame-tue-640.png" },
        3: { name: "wed", uid: "frame_wed_bamboo_rabbit_v2", url: "https://i.ibb.co/Lzv9bQbJ/frame-wed-640.png" },
        4: { name: "thu", uid: "frame_thu_baby_bear_v2", url: "https://i.ibb.co/8wWQF1R/frame-thu-640.png" },
        5: { name: "fri", uid: "frame_fri_astro_boy", url: "https://i.ibb.co/VYmyDN1g/frame-fri-640.png" },
        6: { name: "sat", uid: "frame_sat_cyber_cat", url: "https://i.ibb.co/wFdwxy9w/frame-sat-640.png" },
        0: { name: "sun", uid: "frame_sun_robot_gamer", url: "https://i.ibb.co/d4vFGDw2/frame-sun-640.png" }
    };

    // Tính chuẩn múi giờ Việt Nam (UTC+7) kể cả trong tiến trình VPN ngầm của iOS
    var nowUtc = new Date();
    var vnTime = new Date(nowUtc.getTime() + (7 * 60 * 60 * 1000));
    var currentDay = vnTime.getUTCDay(); // 0 = CN, 1 = T2, ..., 6 = T7
    var todayFrame = dailyFrames[currentDay] || dailyFrames[1];
    var dayUid = todayFrame.uid + "_" + vnTime.getUTCFullYear() + "_" + (vnTime.getUTCMonth() + 1) + "_" + vnTime.getUTCDate();

// 6. WIDGET SỰ KIỆN MỚI, KHUNG HOÀNG GIA & BẬT ĐỊA CHỈ + FOCUS
// ============================================================
Object.assign(obj.entries, {
    widget_frame_event_max_images: "10",
    android_widget_frame_event_enabled: "true",
    widget_badge_enabled: "true",
    widget_badge_v2: "true",
    widget_stale_state_enabled: "false",
    widget_last_sent_indicator: "false",
    widget_sync_token_reload_mode: "clearTokenNever",

    widget_frame_event: JSON.stringify({
        uid: "custom_frame_event_2026",
        url: "https://i.ibb.co/7dXZMyBg/1.png",
        use_local_time_zone: true,
        placement: "below",
        start_at: "2020-01-01T00:00:00",
        end_at: "2099-12-31T23:59:59"
    }),

    custom_widget_frames: "enabled",
    custom_widget_frames_enabled: "true",

    widget_frames_config: JSON.stringify({
        enabled: true,
        allow_custom_frames: true,
        unlock_all_styles: true,
        default_style: "royal_gold_vip",
        styles: [
            {
                id: "royal_gold_vip",
                name: "👑 VIP Royal Gold",
                border_style: "ornate_gold",
                crown_badge: true,
                badge_text: "VIP",
                corner_radius: 28.0,
                glow_effect: true,
                glow_color: "#FFD700",
                overlay_asset: "royal_crown_frame"
            },
            {
                id: "verified_blue_vip",
                name: "💎 Tích Xanh Verified VIP",
                border_style: "ornate_gold",
                crown_badge: true,
                badge_text: "VERIFIED",
                corner_radius: 28.0,
                glow_effect: true,
                glow_color: "#1D9BF0",
                overlay_asset: "https://locket-vip.mhiep20077.workers.dev/assets/verified_badge.png"
            }
        ]
    }),

    widget_frame_styles: JSON.stringify([
        "royal_gold_vip",
        "verified_blue_vip",
        "gold_luxury",
        "classic"
    ]),

    seasonal_frames_config: JSON.stringify({
        enabled: true,
        auto_rotate: false,
        override_default: true,
        current_season_theme: "royal_gold_vip"
    }),

    live_activity_onboarding: "true",
    live_activity_onboarding_variant: "friending",
    register_live_activity_push_to_start_token: "true",
    live_activity_remove_stale_start_token: "true",
    notification_preferences_live_activities: "true",
    notification_preferences: "true",
    notification_reply_body_visible: "true",
    prompt_notification_permissions_after_friending: "true",
    activity_bar_enabled: "true",
    journal_activity_bar_enabled: "true",

    // BẬT ĐỊA CHỈ (location: true) VÀ FOCUS NỘI DUNG ẢNH (focus_animation: true)
    journal_settings: JSON.stringify({
        debug_menu_enabled: false,
        focus_animation: true,
        compact_header: true,
        friends_button: true,
        reverse_scroll_direction: false,
        streak_visualization: true,
        streak_visualization_style: "gradient",
        streak_header_minimum_count: 0,
        streak_visualization_minimum_count: 1,
        overlay_indicators: {
            location: true,
            music: true,
            static_content: true,
            weather: true
        }
    }),

    qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
    custom_profile_pics: "true",
    profile_menu_v2_enabled: "true"
});

    // ============================================================
    // 7. HỆ THỐNG, CACHE & STORAGE CDN
    // ============================================================
    Object.assign(obj.entries, {
        cdn_domain_replacements: JSON.stringify({ "firebasestorage.googleapis.com": "cdn.locketcamera.com" }),
        cdn_domain_replacements_video: "true",
        // functions_domains: JSON.stringify(["https://api.locketcamera.com", "https://us-central1-locket-4252a.cloudfunctions.net"]),
        storage_bucket: "gs://locket-img",
        storage_bucket_video: "gs://locket-video",
        camera_filter_storage_bucket: "gs://locket-filters",
        image_cache_max_age_sec: "157680000",
        image_cache_max_size: "400000000",
        history_cache_age_days: "1000",
        user_cache_max_age_sec: "691200",
        friends_cache_max_age_sec: "2592000",
        image_fetch_cache: "true",
        image_cache_use_shared: "true",
        use_doc_dir_for_image_cache: "true",
        efficient_history_cache_invalidation: "true",
        timestamp_based_history_fetches: "true",
        get_latest_moment_v2: "true",
        fetch_users_from_cloud_function: "true",
        refresh_interval: "60",
        firestore_refresh_v2: "true",
        firestore_refresh_v3: "true",
        keychain_access_retries: "true",
        blocked_users_cached_sync_enabled: "true",
        beta_features_enabled: "true",
        join_testflight_enabled: "true",
        safety_center: "true",
        help_center: "true",
        support_v2: "true",
        privacy_choices_setting: "true",
        request_att_permission: "true",
        invite_link_preview_variant: "4",
        share_history_config: JSON.stringify({ prompt_enabled: false, fetching_enabled: true }),
        share_history_prompt_enabled: "false",
        use_thumbnails_for_sharing: "true",
        use_thumbnails_in_timeline: "true",
        upload_use_webp_thumbnails: "true",
        persist_onboarding_step: "true",
        onboarding_contact_permission_step: "true",
    });

    // ============================================================
// 8. OVERLAY & CUSTOM CAPTIONS
// ============================================================
Object.assign(obj.entries, {
    overlay_navigator_enabled: "true",
    overlays_v2_config: JSON.stringify({ suggestions_enabled: true }),
    captions_enabled: "true",
    music_caption_enabled: "true",
    music_caption_song_preview_enabled: "true",
    link_caption_link_enabled: "true",
    overlay_dynamic_captions: JSON.stringify([
        "standard", "poll", "color_palette", "review", "music", "location",
        "weather", "time", "streak", "star_sign", "party_time", "locket_count",
        "good_morning", "goodnight", "ootd", "miss_you", "custom", "phunu_2010", "halloween_2026"
    ]),
    overlay_items: JSON.stringify([
        {
                "section": "🎨 General",
                "items": [
                        {
                                "overlay_id": "caption:standard",
                                "source": "local",
                                "caption": {
                                        "type": "standard"
                                }
                        },
                        {
                                "overlay_id": "caption:link",
                                "source": "local",
                                "caption": {
                                        "type": "link"
                                },
                                "overlay_type": "caption"
                        },
                        {
                                "overlay_id": "caption:review",
                                "source": "local",
                                "caption": {
                                        "type": "review"
                                }
                        },
                        {
                                "overlay_id": "caption:music",
                                "source": "local",
                                "caption": {
                                        "type": "music"
                                }
                        },
                        {
                                "overlay_id": "caption:location",
                                "source": "local",
                                "caption": {
                                        "type": "location"
                                }
                        },
                        {
                                "overlay_id": "caption:weather",
                                "source": "local",
                                "caption": {
                                        "type": "weather"
                                }
                        },
                        {
                                "overlay_id": "caption:time",
                                "source": "local",
                                "caption": {
                                        "type": "time"
                                }
                        },
                        {
                                "overlay_id": "caption:streak",
                                "source": "local",
                                "caption": {
                                        "type": "streak"
                                }
                        },
                        {
                                "overlay_id": "caption:star_sign",
                                "source": "local",
                                "caption": {
                                        "type": "star_sign"
                                }
                        },
                        {
                                "overlay_id": "caption:poll",
                                "source": "local",
                                "caption": {
                                        "type": "poll"
                                }
                        },
                        {
                                "overlay_id": "caption:color_palette",
                                "source": "local",
                                "caption": {
                                        "type": "color_palette"
                                }
                        },
                        {
                                "overlay_id": "caption:live",
                                "source": "local",
                                "caption": {
                                        "type": "live"
                                }
                        },
                        {
                                "overlay_id": "caption:locket_count",
                                "source": "local",
                                "caption": {
                                        "type": "locket_count"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Tình yêu & Cơm chó 💕",
                "items": [
                        {
                                "overlay_id": "caption:em_nho_anhh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF6B81",
                                                        "#FF8E9E",
                                                        "#FFB3C6"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥺",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "em nhớ anhh",
                                        "text_color": "#8C1938",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:nho_anh_phien",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F0B5CB",
                                                        "#F6D0DF",
                                                        "#DCCAF0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥺",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "nhớ anh tới mức hơi phiền",
                                        "text_color": "#70445A",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:i_love_you",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF8FAB",
                                                        "#FFC2D1",
                                                        "#FFE5EC"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💗",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "i love you",
                                        "text_color": "#8A304F",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:yeu_cuc_dang",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F2B5C8",
                                                        "#F8D5D9",
                                                        "#F6E5D2"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "yêu cục dàng",
                                        "text_color": "#754454",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:yeu_emmm",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F2AFC6",
                                                        "#F7C9D9",
                                                        "#E5CFF4"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💗",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Yeu Emmm",
                                        "text_color": "#70445C",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:yeu_anhhh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#B8C9F2",
                                                        "#D5DDF8",
                                                        "#E8CFF0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫶",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Yeu Anhhh",
                                        "text_color": "#414C72",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:baby_love",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFB6C1",
                                                        "#FF69B4",
                                                        "#FF1493"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🧸",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Baby Love 💖",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:muon_duoc_om",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF9A9E",
                                                        "#FECFEF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫂",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Muốn được ôm",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cho_hun_mieng",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F3AFC7",
                                                        "#F8D0D8",
                                                        "#F4C9BB"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😘",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "cho hun miếng coi",
                                        "text_color": "#754252",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:me_anh_me_ngu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#C4C8EF",
                                                        "#DED3F4",
                                                        "#EBCDE4"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💤",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "mê anh hơn mê ngủ",
                                        "text_color": "#4F4770",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:be_be_can_do",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF8FAB",
                                                        "#FFC2D1",
                                                        "#FFE5EC"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "em bé cần được dỗ",
                                        "text_color": "#812D4A",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:iu_thi_noi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFD166",
                                                        "#FFE8A3",
                                                        "#FFF3D0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤭",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "iu thì nói, đừng có ngại",
                                        "text_color": "#704510",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:iu_hong_thi_bao",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF6B6B",
                                                        "#FF9999",
                                                        "#FFD1C9"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "iu hong thì bảo",
                                        "text_color": "#812626",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:anh_thuong_em",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#A0C4FF",
                                                        "#BDE0FE",
                                                        "#DFF3FF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥹",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "anh có thương em thiệt hong",
                                        "text_color": "#23466F",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:yeu_em_nhiem_vu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#B7E4C7",
                                                        "#D8F3DC",
                                                        "#F0FFF1"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫡",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "yêu em là nhiệm vụ cả đời",
                                        "text_color": "#24563A",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:crush_nhin",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#CDB4DB",
                                                        "#E2CFEA",
                                                        "#F3E5F5"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫠",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "crush nhìn em một cái là xong",
                                        "text_color": "#593B68",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ngoai_le_cua_em",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#80CBC4",
                                                        "#B2DFDB",
                                                        "#E0F2F1"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫶",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "anh là ngoại lệ của em",
                                        "text_color": "#205953",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dang_ban_tuong_tu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1A2980",
                                                        "#26D0CE"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💭",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Đang bận tương tư",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:mac_bay_tinh_yeu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EE9CA7",
                                                        "#FFDDE1"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💘",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mắc bẫy tình yêu",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:minh_cuoi_nhau",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F0B8CD",
                                                        "#F7D4DF",
                                                        "#E7C9EF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💍",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "hông ấy mình cưới nhau đi",
                                        "text_color": "#70465B",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:wedding_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFE4E1",
                                                        "#E73C7E"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💍",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Wedding Time!",
                                        "localized_text": {
                                                "en": "Wedding Time!",
                                                "vn": "Đám cưới nè!"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dating_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E91E63",
                                                        "#F44336"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💕",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Dating Time!",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tuong_love_hoa_ra_lop",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#C9184A",
                                                        "#FF4D6D",
                                                        "#FFB3C6"
                                                ]
                                        },
                                        "icon": {
                                                "data": "❤️🩹",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tưởng love hoá ra lốp",
                                        "text_color": "#64152F",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cam_thay_hanh_phuc",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EC407A",
                                                        "#F8BBD0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🇻🇳",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cảm thấy hạnh phúc",
                                        "localized_text": {
                                                "en": "Feeling Happy",
                                                "vn": "Cảm thấy hạnh phúc"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Holiday Caption",
                "items": [
                        {
                                "overlay_id": "caption:halloween_2026",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#150804",
                                                        "#C8540D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎃",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Halloween",
                                        "localized_text": {
                                                "en": "Halloween",
                                                "vn": "Halloween"
                                        },
                                        "text_color": "#FFB182",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:autumn_2026",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFE0A0",
                                                        "#F6A53A"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍂",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xin chào Mùa Thu",
                                        "localized_text": {
                                                "en": "Xin chào Mùa Thu",
                                                "vn": "Xin chào Mùa Thu"
                                        },
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:christmas_eve_2026",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2FA85F",
                                                        "#176B3A"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🕯️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Giáng sinh an lành",
                                        "localized_text": {
                                                "en": "Giáng sinh an lành",
                                                "vn": "Giáng sinh an lành"
                                        },
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:christmas_day_2026",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E53935",
                                                        "#A81818"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎄",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Giáng sinh an lành",
                                        "localized_text": {
                                                "en": "Giáng sinh an lành",
                                                "vn": "Giáng sinh an lành"
                                        },
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:new_years_eve_2026",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFC64B",
                                                        "#FFEDBF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥂",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xin chào 2027!",
                                        "localized_text": {
                                                "en": "Xin chào 2027!",
                                                "vn": "Xin chào 2027!"
                                        },
                                        "text_color": "#643F00",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:new_years_day_2027",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#3B00EC",
                                                        "#823FFF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💫",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xin chào 2027!",
                                        "localized_text": {
                                                "en": "Xin chào 2027!",
                                                "vn": "Xin chào 2027!"
                                        },
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:new_years_day_2027_alternate",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF0062",
                                                        "#FF783F"
                                                ]
                                        },
                                        "max_lines": 1,
                                        "text": "2027",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Decorative by Locket",
                "items": [
                        {
                                "overlay_id": "caption:toi_nho_em",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFFFFF",
                                                        "#6D9EEB"
                                                ]
                                        },
                                        "max_lines": 1,
                                        "text": "보고 싶어 🥺",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:party_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#5EFFF5",
                                                        "#FCFF57"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🪩",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Party Time!",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:good_morning",
                                "source": "remote",
                                "daily_start_hour": 5,
                                "daily_end_hour": 10,
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EF7402",
                                                        "#EABF0F"
                                                ]
                                        },
                                        "icon": {
                                                "data": "☀️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Good morning",
                                        "text_color": "#FFFFFFE5",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:goodnight",
                                "source": "remote",
                                "daily_start_hour": 19.5,
                                "daily_end_hour": 24,
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#370C6F",
                                                        "#575CD4"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌙",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Goodnight",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ootd",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFFFFF",
                                                        "#DBDBDB"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🕶",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "OOTD",
                                        "text_color": "#101010E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:miss_you",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EC0C00",
                                                        "#FF493F"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥰",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Miss you",
                                        "text_color": "#FFFFFFDB",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Decorative by Hkhai(EmXú)",
                "items": [
                        {
                                "overlay_id": "caption:bunniesept nah",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF91B4",
                                                        "#FFB9CF",
                                                        "#FFE2ED"
                                                ]
                                        },
                                        "max_lines": 1,
                                        "text": " bunniesept nah 🐰 ",
                                        "text_color": "#77717A",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:Em NeXú",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#B8E7FF",
                                                        "#A8F5D0",
                                                        "#DCCBFF"
                                                ]
                                        },
                                        "max_lines": 1,
                                        "text": "💻 Em NeXú",
                                        "text_color": "#183153",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:Hieon",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#B8E7FF",
                                                        "#A8F5D0",
                                                        "#DCCBFF"
                                                ]
                                        },
                                        "max_lines": 1,
                                        "text": "Hieon",
                                        "text_color": "#183153",
                                        "type": "static_content"
                                }
                        },

                        {
                                "overlay_id": "caption:feeling_cute",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F8BBD0",
                                                        "#E91E63"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌷",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Feeling Cute",
                                        "localized_text": {
                                                "en": "Feeling Cute",
                                                "vn": "Cảm thấy dthw"
                                        },
                                        "text_color": "#FFFFFFE5",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFD6A5",
                                                        "#FFF1A8",
                                                        "#FFC4D6"
                                                ]
                                        },
                                        "max_lines": 1,
                                        "text": "Cu 🐎",
                                        "text_color": "#633B24",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tuat",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2C1A0E",
                                                        "#5D4037",
                                                        "#D7A86E"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🐕",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tuất",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:wedding_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFE4E1",
                                                        "#E73C7E"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💍",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Wedding Time!",
                                        "localized_text": {
                                                "en": "Wedding Time!",
                                                "vn": "Đám cưới nè!"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cam_thay_hanh_phuc",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EC407A",
                                                        "#F8BBD0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🇻🇳",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cảm thấy hạnh phúc",
                                        "localized_text": {
                                                "en": "Feeling Happy",
                                                "vn": "Cảm thấy hạnh phúc"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:coffee_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#4E342E",
                                                        "#8D6E63"
                                                ]
                                        },
                                        "icon": {
                                                "data": "☕",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Coffee Time!",
                                        "localized_text": {
                                                "en": "Coffee Time!",
                                                "vn": "Giờ uống cà phê!"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:snake_vibes",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2E7D32",
                                                        "#66BB6A"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🐍",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Snake Vibes",
                                        "localized_text": {
                                                "en": "Snake Vibes",
                                                "vn": "Chất rắn"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:mixue_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFF9C4",
                                                        "#F8BBD0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍦",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mixue Time!",
                                        "localized_text": {
                                                "en": "Mixue Time!",
                                                "vn": "Giờ Mixue!"
                                        },
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:locket_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#ECEFF1",
                                                        "#B3E5FC"
                                                ]
                                        },
                                        "icon": {
                                                "data": "📷",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Locket Time!",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cinema_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1A237E",
                                                        "#455A64"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎬",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cinema Time!",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dating_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E91E63",
                                                        "#F44336"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💕",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Dating Time!",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:graduation_day",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1A237E",
                                                        "#283593"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎓",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Happy Graduation Day!",
                                        "localized_text": {
                                                "en": "Happy Graduation Day!",
                                                "vn": "Chúc mừng tốt nghiệp!"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:shopping_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#B3E5FC",
                                                        "#FFFFFF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🛍️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Shopping Time!",
                                        "localized_text": {
                                                "en": "Shopping Time!",
                                                "vn": "Giờ mua sắm!"
                                        },
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dinner_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFCCBC",
                                                        "#FF8A80"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍽️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Dinner Time!",
                                        "localized_text": {
                                                "en": "Dinner Time!",
                                                "vn": "Giờ ăn tối!"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:chilling_time",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E1BEE7",
                                                        "#F8BBD0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌴",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Chilling Time!",
                                        "localized_text": {
                                                "en": "Chilling Time!",
                                                "vn": "Giờ thư giãn!"
                                        },
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Độc lạ đời sống",
                "items": [
                        {
                                "overlay_id": "caption:xin_vinh_biet_cu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#232526",
                                                        "#414345"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🕯️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xin vĩnh biệt cụ",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:chay_ngay_di",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#D31027",
                                                        "#EA384D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🏃💨",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Chạy ngay đi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:luc_nao_co_tien_thi_moi_di_a",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#0F2027",
                                                        "#203A43",
                                                        "#2C5364"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💸",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Lúc nào có tiền thì mới đi á",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cu_tu_tu_khoai_se_nhu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#56AB2F",
                                                        "#A8E063"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥔",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cứ từ từ khoai sẽ nhừ",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:kiem_tra_nhan_pham",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#654EA3",
                                                        "#EAAFC8"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎲",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Kiểm tra nhân phẩm",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:doc_so_tai_khoan",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1E90FF",
                                                        "#00D4FF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💳",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "đọc số tài khoản",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ai_so_thi_di_ve",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#B71C1C",
                                                        "#FF5722"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🏃",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "ai sợ thì đi về",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:con_cai_nit",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#D7CCC8",
                                                        "#8D6E63"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🧶",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "còn cái nịt",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:canh_bao_co_hat",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#9C27B0",
                                                        "#E91E63"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎤",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "cảnh báo có hát",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:than_chua_ma_don",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#607D8B",
                                                        "#37474F"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😔",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Thân chưa mà dỡn",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ai_muon",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E91E63",
                                                        "#F44336"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤔",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ai mượn?",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:hay_ra_de_qua_a",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFF59D",
                                                        "#80DEEA"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥺",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Hay ra dẻ quá à!",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:giam_suc_manh_con_tuong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#4CAF50",
                                                        "#00BCD4"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎮",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Giảm sức mạnh con tướng",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:mac_co_qua_hai_oi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFB74D",
                                                        "#F8BBD0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😭",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mắc cỡ quá hai ơi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:minh_la_lop",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#263238",
                                                        "#455A64"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🛞",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mình là lốp",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dep_trai_co_gi_sai",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF5722",
                                                        "#FFC107"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😎",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Đẹp trai có gì sai",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:mong_ton_hoa_sen",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#D8B4E2",
                                                        "#F8BBD0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🪷",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mong tôn hoa sen thấy cảnh này",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dam_nhau_khong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E53935",
                                                        "#FF7043"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥊",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "đấm nhau không",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:sieu_cap_ba_khi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EC407A",
                                                        "#F44336"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🐉",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "siêu cấp bá khí",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:du_an_ma",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#263238",
                                                        "#455A64"
                                                ]
                                        },
                                        "icon": {
                                                "data": "👻",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "dự án ma",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:doi_roi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF5F6D",
                                                        "#FFC371"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😤",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Dỗi rồi",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:dang_ban_tuong_tu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1A2980",
                                                        "#26D0CE"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💭",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Đang bận tương tư",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:mo_hon_nhung_tam_hien",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFB75E",
                                                        "#ED8F03"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🐤",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mỏ hỗn nhưng tâm hiền",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:muon_duoc_om",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF9A9E",
                                                        "#FECFEF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫂",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Muốn được ôm",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Trend TikTok (36 Caption)",
                "items": [
                        {
                                "overlay_id": "caption:hoi_chieu_troi_mua",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#546E7A",
                                                        "#263238"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌧️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Hồi chiều trời mưa...",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:con_vien_la_lan",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#12C2E9",
                                                        "#F64F59"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍂",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "côn viên lá làn",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:gian_dang_iu_hong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#3E2723",
                                                        "#6D4C41",
                                                        "#A1887F"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🪳",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Gián đáng iu hong",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:nau_xoi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#7B1FA2",
                                                        "#E91E63",
                                                        "#FFB74D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🙀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Nấu xói",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:co_tien_lam_phien_thien_ha",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#0F0C29",
                                                        "#302B63",
                                                        "#F7971E",
                                                        "#FFD200"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💰",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Có tiền làm phiền thiên hạ",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:nguoi_im_lang_gap_nguoi_hay_noi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#232526",
                                                        "#414345",
                                                        "#6C7A89",
                                                        "#B0BEC5"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤐",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Người im lặng gặp người hay nói",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:roi_let_luon",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF9A9E",
                                                        "#FECFEF",
                                                        "#FBC2EB",
                                                        "#A6C1EE"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💅",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "rồi lét luôn",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:roi_gay_luon",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF6EC7",
                                                        "#7873F5",
                                                        "#4ADEDE",
                                                        "#FFE66D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌈",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "rồi gay luôn",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tuyet_doi_khong_nghe",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF416C",
                                                        "#FF4B2B"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🙉",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tuyệt đối không nghe",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cha_nay_tu_luyen_ghe",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFDEE9",
                                                        "#B5FFFC",
                                                        "#FAD0C4",
                                                        "#FFD1FF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🪞",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cha này tự luyến ghê",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:co_bien_co_bien",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF512F",
                                                        "#F09819",
                                                        "#FFD200"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🚨",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Có biến có biến",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:hong_drama",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#8A2387",
                                                        "#E94057",
                                                        "#F27121"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍿",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Hóng drama",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cuoi_vcl_m_oi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F7971E",
                                                        "#FFD200",
                                                        "#FFEE58"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😂",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cười vcl m oi",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:vl_m_oi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1F1C2C",
                                                        "#928DAB",
                                                        "#C9D6FF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😳",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "vl m ơi?",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:noi_het_bi_mat_thi_co_yeu_hong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EE9CA7",
                                                        "#FFDDE1",
                                                        "#C6FFDD",
                                                        "#FBD786"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤫",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Nói hết bị mật thì có yêu hong",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:flex_den_hoi_tho_cuoi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F7971E",
                                                        "#FFD200"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💎",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Flex đến hơi thở cuối",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:overthinking_vai_chuong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2C3E50",
                                                        "#4CA1AF"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤯",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Overthinking vai chưởng",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:chan_bo_may_di",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#870000",
                                                        "#190A05"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🙄",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Chan bố mày đi",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:oach_xa_lach",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#11998E",
                                                        "#38EF7D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥬",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "oách xà lách",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:lai_phai_lo",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FBD3E9",
                                                        "#BB377D",
                                                        "#6A0572"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💔",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "lại phải lọ",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ua_alo_1",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#8E2DE2",
                                                        "#4A00E0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "📞",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ủa alo",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ke_chuyen_nghe_choi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#8A2387",
                                                        "#E94057"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍿",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Kể chuyện nghe chơi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:hom_nay_toi_buon",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#141E30",
                                                        "#243B55"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "hôm nay tôi buồn",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:xinh_dep_tuyet_voi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FC5C7D",
                                                        "#6A82FB"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💅",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xinh đẹp tuyệt vời",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tram_cam_nhe",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1F1C2C",
                                                        "#928DAB"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫠",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Trầm cảm nhẹ",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:chua_du_wow",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF5349",
                                                        "#EB0C00"
                                                ]
                                        },
                                        "icon": {
                                                "data": "⭐",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Chưa đủ wow",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:boc_trung_sit_rit",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#9C27B0",
                                                        "#7B1FA2"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎁",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Bóc trúng sít rịt",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:hen_lam_moi_xui_duoc_vay_a",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#00BCD4",
                                                        "#0097A7"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😅",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Hên lắm mới xui được vậy á",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ra_duong_ne_moi_anh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2196F3",
                                                        "#1976D2"
                                                ]
                                        },
                                        "icon": {
                                                "data": "👤",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ra đường nể mỗi anh",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cung_cung_di",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFC107",
                                                        "#FFA000"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🚀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cũng cứng đi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tuyet_doi_dien_anh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#455A64",
                                                        "#263238"
                                                ]
                                        },
                                        "icon": {
                                                "data": "📷",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tuyệt đối điện ảnh",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:du_ba_khi_chua",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF5722",
                                                        "#E64A19"
                                                ]
                                        },
                                        "icon": {
                                                "data": "⚡",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Đủ bá khí chưa",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ua_alo_2",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#9C27B0",
                                                        "#7B1FA2"
                                                ]
                                        },
                                        "icon": {
                                                "data": "❓",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ủa alo?",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cai_gi_vay_troi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F44336",
                                                        "#D32F2F"
                                                ]
                                        },
                                        "icon": {
                                                "data": "❗",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cái gì vậy trời",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:nay_la_het_cuu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#607D8B",
                                                        "#455A64"
                                                ]
                                        },
                                        "icon": {
                                                "data": "❌",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Này là hết cứu",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:qua_la_dien_anh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#26A69A",
                                                        "#00897B"
                                                ]
                                        },
                                        "icon": {
                                                "data": "📷",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Quá là điện ảnh",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Gen Z Life 🩻",
                "items": [
                        {
                                "overlay_id": "caption:hao_han",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#114357",
                                                        "#F29492"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🗡️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Hảo hán",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:cam_lanh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2193B0",
                                                        "#6DD5ED"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤧",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cảm lạnh",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:bat_luc",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2C3E50",
                                                        "#3498DB"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🏳️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Bất lực",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:xin_lui_duoc_chua",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F6D365",
                                                        "#FDA085"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🥺",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xin lũi được chưa",
                                        "text_color": "#000000",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:rot_nuoc_mat",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#1CB5E0",
                                                        "#000046"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😭",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Rớt nước mắt",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:guc_nga",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#3A1C71",
                                                        "#D76D77"
                                                ]
                                        },
                                        "icon": {
                                                "data": "📉",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Gục ngã",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tien_dinh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#C33764",
                                                        "#1D2671"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌪️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tiền đình",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:che_manh",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF4E50",
                                                        "#F9D423"
                                                ]
                                        },
                                        "icon": {
                                                "data": "👎",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Chê mạnh",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:xinh_gai_an_phim_1",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F77062",
                                                        "#FE5196"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💅",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Xinh gái ấn phím 1",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:di_lam_vi_dam_me",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FDC830",
                                                        "#F37335"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤡",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Đi làm vì đam mê",
                                        "text_color": "#FFFFFF",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Meme vui nhộn",
                "items": [
                        {
                                "overlay_id": "caption:cuoi_xiu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFEB3B",
                                                        "#FF9800"
                                                ]
                                        },
                                        "icon": {
                                                "data": "😎",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cười xỉu",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:toang_that_roi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F44336",
                                                        "#B71C1C"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🐉",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Toang thật rồi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:toi_roi_toi_roi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#673AB7",
                                                        "#512DA8"
                                                ]
                                        },
                                        "icon": {
                                                "data": "❗",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tới rồi tới rồi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:khong_the_tin_noi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#00BCD4",
                                                        "#0097A7"
                                                ]
                                        },
                                        "icon": {
                                                "data": "❓",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Không thể tin nổi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Đời sống",
                "items": [
                        {
                                "overlay_id": "caption:ngay_moi_vui_ve",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#4CAF50",
                                                        "#2E7D32"
                                                ]
                                        },
                                        "icon": {
                                                "data": "☀️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ngày mới vui vẻ",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ngu_ngon",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#3F51B5",
                                                        "#1A237E"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌙",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ngủ ngon",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:an_com_chua",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF9800",
                                                        "#F57C00"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🍽️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ăn cơm chưa?",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:di_choi_khong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#E91E63",
                                                        "#C2185B"
                                                ]
                                        },
                                        "icon": {
                                                "data": "✈️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Đi chơi không?",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Gen Z Slay",
                "items": [
                        {
                                "overlay_id": "caption:tinh_hoa_hoi_tu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFD700",
                                                        "#FF8C00"
                                                ]
                                        },
                                        "icon": {
                                                "data": "✨",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tinh hoa hội tụ",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:phu_tinh_khong_phu_ban",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#8E2DE2",
                                                        "#4A00E0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🕶️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Phụ tình không phụ bản",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ngoan_xinh_yeu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FFAFBD",
                                                        "#FFC3A0"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌸",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Ngoan xinh yêu của ai?",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:nhin_la_biet_uy_tin",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#2980B9",
                                                        "#2C3E50"
                                                ]
                                        },
                                        "icon": {
                                                "data": "👌",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Nhìn là biết uy tín",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Bất ổn & Khó đỡ",
                "items": [
                        {
                                "overlay_id": "caption:luon_vui_tuoi",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#00F2FE",
                                                        "#4FACFE"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🤡",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Luôn vui tươi",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:bat_on_that_su",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#636363",
                                                        "#A2AB58"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🫠",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Bất ổn thật sự",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:khong_cam_xuc",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#434343",
                                                        "#000000"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🗿",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Không cảm xúc",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:phu_huynh_dung_xem",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#FF0844",
                                                        "#FFB199"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🙈",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Phụ huynh đừng xem",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Check VAR & Hóng hớt",
                "items": [
                        {
                                "overlay_id": "caption:check_var",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#11998E",
                                                        "#38EF7D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "📺",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Check VAR liền",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:qua_nhieu_su_de_thuong",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#F38181",
                                                        "#FCE38A"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🎀",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Quá nhiều sự dễ thương",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:mac_bay_tinh_yeu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#EE9CA7",
                                                        "#FFDDE1"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💘",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Mắc bẫy tình yêu",
                                        "text_color": "#000000E6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:song_gio_phu_doi_trai",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#3A1C71",
                                                        "#D76D77"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🌪️",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Sóng gió phủ đời trai",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        },
        {
                "section": "🎨 Góc Deadline & Đi Làm",
                "items": [
                        {
                                "overlay_id": "caption:deadline_ruot",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#ED213A",
                                                        "#93291E"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🔥",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Deadline dí tụt quần",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:ca_o_ran_doc",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#0F2027",
                                                        "#1B5E20",
                                                        "#66BB6A"
                                                ]
                                        },
                                        "icon": {
                                                "data": "🐍",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cả ổ rắn độc",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:tien_dau_ma_tieu",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#11998E",
                                                        "#38EF7D"
                                                ]
                                        },
                                        "icon": {
                                                "data": "💸",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Tiền đâu mà tiêu",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        },
                        {
                                "overlay_id": "caption:nghien_cuu_khoa_hoc",
                                "source": "remote",
                                "caption": {
                                        "background": {
                                                "colors": [
                                                        "#0F2027",
                                                        "#2C5364"
                                                ]
                                        },
                                        "icon": {
                                                "data": "☕",
                                                "type": "emoji"
                                        },
                                        "max_lines": 1,
                                        "text": "Cần nạp cafein gấp",
                                        "text_color": "#FFFFFFE6",
                                        "type": "static_content"
                                }
                        }
                ]
        }
])
});
    // ============================================================
// 9. HÀM VẢ CỰC MẠNH (FORCE OVERRIDE ĐÈ TẤT CẢ GIÁ TRỊ VỀ GOLD & 45S)
// ============================================================
function hamVaForceOverride(entries) {
    if (!entries || typeof entries !== "object") return;
    
    // 1. Vả thời lượng 45 giây vào mọi key video/duration
    var durationKeys = [
        "max_video_duration", "video_max_duration", "camera_roll_max_duration",
        "camera_roll_video_max_duration", "camera_roll_duration",
        "video_trim_max_duration", "trim_max_duration", "gold_max_duration", "goldMaxDuration"
    ];
    for (var i = 0; i < durationKeys.length; i++) {
        entries[durationKeys[i]] = "60.0";
    }

    // 2. Vả cờ Gold & Miễn phí toàn bộ bộ lọc
    entries["is_gold"] = "true";
    entries["has_gold"] = "true";
    entries["is_gold_user"] = "true";
    entries["user_is_gold"] = "true";
    entries["gold_user"] = "true";
    entries["gold_active"] = "true";
    entries["all_filters_free"] = "true";
    entries["unlocked_filters"] = "true";
    entries["free_filters_enabled"] = "true";
    entries["filter_selection_enabled"] = "true";
    entries["require_gold_for_filters"] = "false";
    entries["requires_gold_for_filters"] = "false";
    entries["camera_filter_gold_only"] = "false";
    entries["camera_filters_gold_only"] = "false";
    entries["filter_gold_only"] = "false";
    entries["filters_gold_only"] = "false";
    entries["ai_filter_gold_only"] = "false";
    entries["ai_filters_gold_only"] = "false";
    entries["filter_paywall_enabled"] = "false";
    entries["camera_filter_paywall_enabled"] = "false";
    entries["filter_upsell_enabled"] = "false";

    // 3. Vả đè vô hiệu hóa cache cũ của iOS
    entries["cache_ttl_seconds"] = "0";
    entries["client_cache_ttl_sec"] = "0";
}
hamVaForceOverride(obj.entries);

$done({
    body: JSON.stringify(obj)
});