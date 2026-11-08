// ============================================================
// Locket Combined Script: Remote Config + AI Filter Rewrite
// Dùng chung 1 file cho cả 2 endpoint trong Loon / Surge / Shadowrocket
// ============================================================

var url = ($request && $request.url) || "";

// ============================================================
// PHẦN 1: NẾU LÀ REQUEST GỌI ĐẾN AI FILTER / WORKER
// ============================================================
if (url.includes("workers.dev") || url.includes("generateFilteredImage") || (typeof $response !== "undefined" && !url.includes("googleapis.com"))) {
    
    const WORKER_HOST = "https://locket-vip.mhiep20077.workers.dev";[cite: 2]

    const STICKER_ID_MAP = {[cite: 2]
		"stk_rose_flower": "rose_flower",[cite: 2]
		"rose_flower": "rose_flower",[cite: 2]
		"stk_shrek_ogre": "shrek_ogre",[cite: 2]
		"shrek_ogre": "shrek_ogre",[cite: 2]
		"stk_superhero_cape": "superhero_cape",[cite: 2]
		"superhero_cape": "superhero_cape",[cite: 2]
		"stk_spooky_ghost": "spooky_ghost",[cite: 2]
		"spooky_ghost": "spooky_ghost",[cite: 2]
		"stk_pirate_hat": "pirate_hat",[cite: 2]
		"pirate_hat": "pirate_hat",[cite: 2]
		"stk_volcano_lava": "volcano_lava",[cite: 2]
		"volcano_lava": "volcano_lava",[cite: 2]
		"stk_rain_storm": "rain_storm",[cite: 2]
		"rain_storm": "rain_storm",[cite: 2]
		"stk_fortnite_llama": "fortnite_llama",[cite: 2]
		"fortnite_llama": "fortnite_llama",[cite: 2]
		"stk_watercolor_art": "watercolor_art",[cite: 2]
		"watercolor_art": "watercolor_art",[cite: 2]
		"stk_golden_hour": "golden_hour",[cite: 2]
		"golden_hour": "golden_hour",[cite: 2]
		"stk_jungle_leaf": "jungle_leaf",[cite: 2]
		"jungle_leaf": "jungle_leaf",[cite: 2]
		"stk_cute_zombie": "cute_zombie",[cite: 2]
		"cute_zombie": "cute_zombie",[cite: 2]
		"stk_fireworks": "fireworks",[cite: 2]
		"fireworks": "fireworks",[cite: 2]
		"stk_new_year_2026": "new_year_2026",[cite: 2]
		"new_year_2026": "new_year_2026",[cite: 2]
		"stk_harry_potter": "harry_potter",[cite: 2]
		"harry_potter": "harry_potter",[cite: 2]
		"stk_minecraft": "minecraft",[cite: 2]
		"minecraft": "minecraft",[cite: 2]
		"stk_fire_flame": "fire_flame",[cite: 2]
		"fire_flame": "fire_flame",[cite: 2]
		"stk_giant_spider": "giant_spider",[cite: 2]
		"giant_spider": "giant_spider",[cite: 2]
		"stk_ocean_underwater": "ocean_underwater",[cite: 2]
		"ocean_underwater": "ocean_underwater",[cite: 2]
		"stk_ufo_alien": "ufo_alien",[cite: 2]
		"ufo_alien": "ufo_alien",[cite: 2]
        "stk_dio_disco": "disco_lights",[cite: 2]
        "disco": "disco_lights",[cite: 2]
        "stk_dio_pm2": "locket",[cite: 2]
        "stk_dio_cash": "cash_money",[cite: 2]
        "cash": "cash_money",[cite: 2]
        "stk_dio_wedding": "wedding",[cite: 2]
        "wedding": "wedding",[cite: 2]
        "stk_dio_cowboy": "cowboy_cowgirl",[cite: 2]
        "cowboy": "cowboy_cowgirl",[cite: 2]
        "stk_dio_looksmaxing": "looks_maxxing",[cite: 2]
        "looksmaxing": "looks_maxxing",[cite: 2]
        "stk_dio_orange_wig": "okay_wig",[cite: 2]
        "orange_wig": "okay_wig",[cite: 2]
        "stk_dio_bleached_hair": "blonde_bleached",[cite: 2]
        "bleached_hair": "blonde_bleached",[cite: 2]
        "stk_dio_bob": "bob_cut",[cite: 2]
        "bob": "bob_cut",[cite: 2]
        "stk_dio_bearded": "beard",[cite: 2]
        "bearded": "beard",[cite: 2]
        "stk_dio_bearded_holiday": "bearded",[cite: 2]
        "stk_dio_sweat_hearts": "sweet_hearts",[cite: 2]
        "sweat_hearts": "sweet_hearts",[cite: 2]
        "stk_dio_elf": "elf_cutout",[cite: 2]
        "elf": "elf_cutout",[cite: 2]
        "stk_dio_santa": "santa_cutout",[cite: 2]
        "santa": "santa_cutout",[cite: 2]
        "stk_dio_easter_bunny": "easter_bunney_cutout",[cite: 2]
        "easter_bunny": "easter_bunney_cutout",[cite: 2]
        "stk_dio_easter_chick": "easter_chick_cutout",[cite: 2]
        "easter_chick": "easter_chick_cutout",[cite: 2]
        "stk_dio_toothless": "toothless",[cite: 2]
        "toothless": "toothless",[cite: 2]
        "stk_dio_bye_brows": "bye_brows",[cite: 2]
        "bye_brows": "bye_brows",[cite: 2]
        "stk_dio_bowling_ball": "bowling_ball",[cite: 2]
        "bowling_ball": "bowling_ball",[cite: 2]
        "stk_dio_buns": "buns",[cite: 2]
        "buns": "buns",[cite: 2]
        "stk_dio_tatted": "tatted",[cite: 2]
        "tatted": "tatted",[cite: 2]
        "stk_dio_mohawk": "mohawk",[cite: 2]
        "mohawk": "mohawk",[cite: 2]
        "stk_dio_braces": "braces",[cite: 2]
        "braces": "braces",[cite: 2]
        "stk_dio_slimed": "slimed",[cite: 2]
        "slimed": "slimed",[cite: 2]
        "stk_dio_princess": "princess",[cite: 2]
        "princess": "princess",[cite: 2]
        "stk_dio_happy_birthday": "happy_birthday",[cite: 2]
        "happy_birthday": "happy_birthday",[cite: 2]
        "stk_dio_cutesy": "cutesy",[cite: 2]
        "cutesy": "cutesy",[cite: 2]
        "stk_dio_sticker_face": "sticker_face",[cite: 2]
        "sticker_face": "sticker_face",[cite: 2]
        "stk_dio_flower_crown": "flower_crown",[cite: 2]
        "flower_crown": "flower_crown",[cite: 2]
        "stk_dio_love_bug": "love_bug",[cite: 2]
        "love_bug": "love_bug",[cite: 2]
        "stk_dio_giraffe": "giraffe",[cite: 2]
        "giraffe": "giraffe",[cite: 2]
        "stk_dio_clown": "clown",[cite: 2]
        "clown": "clown",[cite: 2]
        "stk_dio_leprechaun": "leprechaun",[cite: 2]
        "leprechaun": "leprechaun",[cite: 2]
        "stk_dio_lucky_face": "lucky_face",[cite: 2]
        "lucky_face": "lucky_face",[cite: 2]
        "stk_dio_frosty": "frosty",[cite: 2]
        "frosty": "frosty",[cite: 2]
        "stk_dio_influencer": "influencer",[cite: 2]
        "influencer": "influencer"[cite: 2]
    };

    // Chiều Request AI Filter
    if (typeof $response === "undefined") {
        try {
            if (!$request) return $done({});[cite: 2]
            const targetUrl = "https://locket-vip.mhiep20077.workers.dev/generateFilteredImage?module=Locket_YouTube";[cite: 2]
            let headers = Object.assign({}, ($request && $request.headers) || {});[cite: 2]
            headers["Host"] = "locket-vip.mhiep20077.workers.dev";[cite: 2]
            headers["host"] = "locket-vip.mhiep20077.workers.dev";[cite: 2]
            headers["X-Module-Origin"] = "Locket_YouTube";[cite: 2]
            return $done({ url: targetUrl, headers: headers });[cite: 2]
        } catch (e) {
            return $done({});[cite: 2]
        }
    }

    // Chiều Response AI Filter
    try {
        if (typeof $response !== "undefined" && $response.body) {[cite: 2]
            let resObj = {};[cite: 2]
            try { resObj = JSON.parse($response.body); } catch (e) { resObj = {}; }[cite: 2]
            delete resObj.error;[cite: 2]
            delete resObj.errors;[cite: 2]
            if (resObj.result) {[cite: 2]
                delete resObj.result.error;[cite: 2]
                delete resObj.result.errors;[cite: 2]
            }
            return $done({
                status: 200,[cite: 2]
                headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" },[cite: 2]
                body: JSON.stringify(resObj)[cite: 2]
            });
        }
    } catch (e) {}[cite: 2]
    
    return $done({});[cite: 2]
}


// ============================================================
// PHẦN 2: MẶC ĐỊNH XỬ LÝ REMOTE CONFIG (FIREBASE)
// ============================================================
var ua = ($request && ($request.headers["User-Agent"] || $request.headers["user-agent"])) || "";
var obj = {};

try {
    obj = JSON.parse($response.body);
} catch (e) {
    obj = {};
}

if (ua.includes("Locket")) {
    obj.Attention = "Chúc mừng bạn! Vui lòng không sử dụng chúng dưới mục đích thương mại!";
    obj.entries = obj.entries || {};

    // 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL
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
            tag: "LOCKET GOLD ALL FEATURES",
            tag_gradient: true,
            tag_style: "gold_gradient",
            title: "Lên Locket Gold rồi đó 😎",
            feature_set: [
                {
                    title: "Nhớ follow kênh tiktok @hkhai0102 ✨",
                    body: "Một follow của bạn, một niềm vui của mình 💛",
                    imageURL: "https://cdn.upanhlaylink.com/i/GSfYXmKd.png"
                }
            ],
            primary_button_title: "Xong rồi nhé!",
            campaign: "locket_gold_welcome_v3",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59",
            use_local_time_zone: true
        }),
        android_subscribe_gold_button_enabled: "false",
        profile_badge_visible: "true",
        lunar_new_year_app_icon_enabled: "true",
        settings_instagram_url: "https://www.instagram.com/hkhai0102/",
        settings_tiktok_url: "https://tiktok.com/@hhai0102"
    });

    // 2. CHẶN QUẢNG CÁO & TẮT TRACKING (SENTRY)
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
        sentry_profiles_sample_rate: "0"
    });

    // 3. CAMERA, VIDEO, FILTERS & UPLOAD QUALITY
    Object.assign(obj.entries, {
        camera: JSON.stringify({
            gold_max_duration: 60.0,
            goldMaxDuration: 60.0,
            max_duration: 60.0,
            maxDuration: 60.0,
            ultra_wide: true,
            ultraWide: true,
            volume_button: true,
            volumeButton: true,
            flash_button: true,
            telephoto: true,
            srgb: true,
            lanczos: true,
            quality_mbps: 0.6,
            qualityMbps: 0.6
        }),
        camera_roll: JSON.stringify({
            gold_max_duration: 30.0,
            goldMaxDuration: 30.0,
            video_max_duration: 30.0,
            videoMaxDuration: 30.0,
            max_duration: 30.0,
            maxDuration: 30.0,
            trim_max_duration: 30.0,
            trimMaxDuration: 30.0,
            camera_roll_max_duration: 30.0,
            quality_mbps: 0.6,
            qualityMbps: 0.6,
            flash_button: true
        }),
        live_photos: JSON.stringify({
            capture: true,
            video: true,
            viewing: true,
            catch_up: true,
            widget_looping_mode: "never"
        }),
        camera_filter_config: JSON.stringify({
            allows_custom_filters: true,
            show_filter_button: true,
            sheet_enabled: true,
            open_sheet_immediately: true,
            sheet_filters: [
                { title: { en: "Goofy" }, filter_ids: ["okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows"] },
                { title: { en: "Looks" }, filter_ids: ["bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns", "tatted", "mohawk", "braces", "bye_brows"] },
                { title: { en: "Celebrate" }, filter_ids: ["slimed", "princess", "disco_lights", "cash_money", "happy_birthday"] },
                { title: { en: "Cute" }, filter_ids: ["cutesy", "sticker_face", "flower_crown", "love_bug"] },
                { title: { en: "Costumes" }, filter_ids: ["wedding", "cowboy_cowgirl", "giraffe", "clown"] },
                { title: { en: "Holidays" }, filter_ids: ["easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun", "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"] }
            ],
            picker_filters: [
                "okay_wig", "influencer", "looks_maxxing", "toothless", "bye_brows",
                "bowling_ball", "blonde_bleached", "beard", "bob_cut", "buns",
                "tatted", "mohawk", "braces", "slimed", "princess",
                "disco_lights", "cash_money", "happy_birthday", "cutesy", "sticker_face",
                "flower_crown", "love_bug", "wedding", "cowboy_cowgirl", "giraffe",
                "clown", "easter_bunney_cutout", "easter_chick_cutout", "bearded", "leprechaun",
                "lucky_face", "sweet_hearts", "elf_cutout", "santa_cutout", "frosty"
            ]
        }),
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

    // 4. BẠN BÈ, GIỚI HẠN & ĐỀ XUẤT KẾT BẠN
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
        username_suggestions_enabled: "true"
    });

    // 5. MOMENTS, STREAK, CHAT & TƯƠNG TÁC
    try {
        var streak = JSON.parse(obj.entries.streak_config || "{}");
        streak.minimum_recovery_count = 0;
        streak.minimum_display_count = 0;
        obj.entries.streak_config = JSON.stringify(streak);
    } catch (e) {}

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
        chat_hyperlink_enabled_mode: "always_enabled",
        send_to_self_only_mode: "always_enabled",
        time_travel_rewind_v2_enabled: "true",
        conversation_drafts_enabled: "true",
        calendar_delete_moment_enabled: "true",
        calendar_rewind_enabled: "false",
        locket_yearbook_story_sharing_encouraged: "true",
        rollcall_enabled: "true",
        rollcall_comment_actions: "true",
        rollcall_profile_button: "true",
        rollcall_prompt_export_after_share: "true",
        rollcall_confirm_skip_tagging: "false",
        rollcall_tap_to_tag_enabled: "false"
    });

    // 6. WIDGET, THÔNG BÁO & GIAO DIỆN
    Object.assign(obj.entries, {
        widget_frame_event_max_images: "5",
        android_widget_frame_event_enabled: "true",
        widget_badge_enabled: "true",
        widget_badge_v2: "true",
        widget_stale_state_enabled: "false",
        widget_last_sent_indicator: "false",
        widget_sync_token_reload_mode: "clearTokenNever",
        widget_frame_event: JSON.stringify({
            uid: "midautumn_2026",
            url: "https://i.ibb.co/1Yt1Dzzy/Shin-chan-1.png",
            use_local_time_zone: true,
            placement: "below",
            start_at: "2020-01-01T00:00:00",
            end_at: "2099-12-31T23:59:59"
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
        journal_settings: JSON.stringify({
            debug_menu_enabled: false,
            focus_animation: false,
            compact_header: true,
            friends_button: false,
            reverse_scroll_direction: false,
            streak_visualization: true,
            streak_visualization_style: "gradient",
            streak_header_minimum_count: 0,
            streak_visualization_minimum_count: 2,
            overlay_indicators: { location: false, music: true, static_content: true, weather: true }
        }),
        qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
        custom_profile_pics: "true",
        profile_menu_v2_enabled: "true"
    });

    // 7. HỆ THỐNG, CACHE & STORAGE CDN
    Object.assign(obj.entries, {
        cdn_domain_replacements: JSON.stringify({ "firebasestorage.googleapis.com": "cdn.locketcamera.com" }),
        cdn_domain_replacements_video: "true",
        storage_bucket: "gs://locket-img",
        storage_bucket_video: "gs://locket-video",
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
        persist_onboarding_step: "true",
        onboarding_contact_permission_step: "true"
    });
}

$done({ body: JSON.stringify(obj) });