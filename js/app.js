(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".main")) {
        if (!sessionStorage.getItem("current-level")) {
            sessionStorage.setItem("current-level", 1);
            document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
        } else document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
        if (+sessionStorage.getItem("money") >= 50) sessionStorage.setItem("current-bet", 50); else sessionStorage.setItem("current-bet", 0);
        document.querySelector(".levels__middle-bet p").textContent = sessionStorage.getItem("current-bet");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const window_height = document.documentElement.clientHeight;
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function get_random_2(min, max) {
        return Math.random() * (max - min) + min;
    }
    function add_money(count, block, delay, delay_off) {
        let money = +sessionStorage.getItem("money") + count;
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function transl_num_to_percent(all, num) {
        return 100 * num / all;
    }
    function get_random_num_arr(mn, mx) {
        function get_rand(mn, mx) {
            return Math.floor(Math.random() * (mx - mn) + mn);
        }
        let arr = [];
        let count = 0;
        return function back() {
            if (2 == count) return arr;
            if (0 == arr.length) {
                let num1 = get_rand(mn, mx);
                arr.push(num1);
                count++;
            }
            if (arr.length == count) {
                let num = get_rand(mn, mx);
                if (true == arr.includes(num)) return back(mn, mx);
                arr.push(num);
                count++;
                return back(mn, mx);
            }
        };
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = get_random(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
    function add_number_storrage(name, number) {
        let arr = get_arr_storrage(name);
        arr.push(number);
        save_arr_storrage(arr, name);
    }
    function save_arr_storrage(arr, name) {
        sessionStorage.setItem(name, JSON.stringify(arr));
    }
    function get_arr_storrage(name) {
        let arr = JSON.parse(sessionStorage.getItem(name));
        let numbers = arr;
        numbers.sort((function(a, b) {
            return a - b;
        }));
        return numbers;
    }
    if (document.querySelector(".main")) {
        if (!sessionStorage.getItem("heroes")) {
            let arr_heroes = [];
            save_arr_storrage(arr_heroes, "heroes");
        }
        if (!sessionStorage.getItem("weapons")) {
            let arr_weapons = [ 1 ];
            save_arr_storrage(arr_weapons, "weapons");
        }
        write_random_enemy();
        check_active_heroes_main_screen();
    }
    function write_random_enemy() {
        let random_arr = get_random_num_arr(1, 9);
        let new_rand_arr = random_arr();
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".actions-main__image_1 source").setAttribute("srcset", `img/enemys/enemy-${new_rand_arr[0]}.webp`);
                document.querySelector(".actions-main__image_2 source").setAttribute("srcset", `img/enemys/enemy-${new_rand_arr[1]}.webp`);
            } else {
                document.querySelector(".actions-main__image_1 img").setAttribute("src", `img/enemys/enemy-${new_rand_arr[0]}.png`);
                document.querySelector(".actions-main__image_2 img").setAttribute("src", `img/enemys/enemy-${new_rand_arr[1]}.png`);
            }
        }), 100);
    }
    function check_active_heroes_main_screen() {
        if (sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".board-main__man_1 source").setAttribute("srcset", `img/heroes/hero-${+sessionStorage.getItem("current-hero-1")}.webp`);
                document.querySelector(".board-main__man_2 source").setAttribute("srcset", `img/heroes/hero-${+sessionStorage.getItem("current-hero-2")}.webp`);
                document.querySelector(".board-main__sword_1 source").setAttribute("srcset", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-1")}.webp`);
                document.querySelector(".board-main__sword_2 source").setAttribute("srcset", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-2")}.webp`);
            } else {
                document.querySelector(".board-main__man_1 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-1")}.png`);
                document.querySelector(".board-main__man_2 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-2")}.png`);
                document.querySelector(".board-main__sword_1 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-1")}.png`);
                document.querySelector(".board-main__sword_2 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-2")}.png`);
            }
        }), 100); else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".board-main__man_1 source").setAttribute("srcset", `img/heroes/hero-${+sessionStorage.getItem("current-hero-1")}.webp`);
                document.querySelector(".board-main__sword_1 source").setAttribute("srcset", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-1")}.webp`);
            } else {
                document.querySelector(".board-main__man_1 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-1")}.png`);
                document.querySelector(".board-main__sword_1 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-1")}.png`);
            }
        }), 100); else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".board-main__man_2 source").setAttribute("srcset", `img/heroes/hero-${+sessionStorage.getItem("current-hero-2")}.webp`);
                document.querySelector(".board-main__sword_2 source").setAttribute("srcset", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-2")}.webp`);
            } else {
                document.querySelector(".board-main__man_2 img").setAttribute("src", `img/heroes/hero-${+sessionStorage.getItem("current-hero-2")}.png`);
                document.querySelector(".board-main__sword_2 img").setAttribute("src", `img/weapons/sword-${+sessionStorage.getItem("current-weapon-2")}.png`);
            }
        }), 100);
    }
    if (document.querySelector(".wrapper__team") && sessionStorage.getItem("preloader")) {
        if (window_height > 600) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) document.querySelector(".content-item__bg source").setAttribute("srcset", "img/other/board-big.webp"); else document.querySelector(".content-item__bg img").setAttribute("src", "img/other/board-big.png");
        }), 100);
        if (sessionStorage.getItem("team-rule")) document.querySelector(".team__rules").classList.add("_hide");
        open_active_heroes();
        open_weapons_active_heroes();
        check_write_weapons();
        check_position_weapons_when_open_page();
        check_active_heroes_when_open_page();
        check_select_all_heroes();
        write_bet_info_weapon();
    } else if (document.querySelector(".wrapper__team") && !sessionStorage.getItem("preloader")) location.href = "index.html";
    function delete_item_locked_weapon(weapon) {
        document.querySelectorAll(".heroe-team__weapon-locked").forEach((el => {
            if (el.closest(weapon) && !el.closest(".heroe-team").classList.contains("_locked")) el.remove();
        }));
    }
    function create_weapon_box(weapon) {
        let box_weapon = document.createElement("div");
        box_weapon.classList.add("heroe-team__box-weapon");
        let board = document.createElement("div");
        board.classList.add("heroe-team__board");
        let board_image = document.createElement("img");
        board_image.setAttribute("src", "img/icons/box-weapon.png");
        board.append(board_image);
        let sword = document.createElement("div");
        sword.classList.add("heroe-team__sword");
        let sword_image = document.createElement("img");
        sword_image.setAttribute("src", `img/weapons/sword-${weapon}.png`);
        sword.append(sword_image);
        let info_bet = document.createElement("div");
        info_bet.classList.add("heroe-team__bet-info");
        info_bet.textContent = "x1";
        let item = document.createElement("div");
        item.classList.add("heroe-team__button-box");
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("heroe-team__button");
        let wing_left = document.createElement("div");
        wing_left.classList.add("heroe-team__button-wing-left");
        let wing_left_image = document.createElement("img");
        wing_left_image.setAttribute("src", "img/icons/btn-left.png");
        wing_left.append(wing_left_image);
        let main_item = document.createElement("div");
        main_item.classList.add("heroe-team__button-middle");
        let main_item_image = document.createElement("img");
        main_item_image.setAttribute("src", "img/icons/btn-middle.png");
        main_item.append(main_item_image);
        let wing_right = document.createElement("div");
        wing_right.classList.add("heroe-team__button-wing-right");
        let wing_right_image = document.createElement("img");
        wing_right_image.setAttribute("src", "img/icons/btn-right.png");
        wing_right.append(wing_right_image);
        let text = document.createElement("p");
        text.textContent = "Select";
        button.append(wing_left, main_item, wing_right, text);
        item.append(button);
        box_weapon.append(board, sword, info_bet, item);
        return box_weapon;
    }
    function create_character(hero_num) {
        let character = document.createElement("div");
        character.classList.add("heroe-team__character");
        let box_hero = document.createElement("div");
        box_hero.classList.add("heroe-team__box-hero");
        let box_hero_image = document.createElement("img");
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) box_hero_image.setAttribute("srcset", "img/icons/card-hero.webp"); else box_hero_image.setAttribute("src", "img/icons/card-hero.png");
        }), 100);
        box_hero.append(box_hero_image);
        let hero = document.createElement("div");
        hero.classList.add("heroe-team__hero");
        let hero_image = document.createElement("img");
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) hero_image.setAttribute("srcset", `img/heroes/hero-${hero_num}.webp`); else hero_image.setAttribute("src", `img/heroes/hero-${hero_num}.png`);
        }), 100);
        hero.append(hero_image);
        character.append(box_hero, hero);
        return character;
    }
    function open_weapons_active_heroes() {
        let heroes = get_arr_storrage("heroes");
        heroes.forEach((el => {
            document.querySelectorAll(".content-item__heroe")[el - 1].classList.add("_opened");
        }));
    }
    function check_write_weapons() {
        let numbers = get_arr_storrage("weapons");
        if (numbers.length < 5) for (let i = 0; i < numbers.length; i++) {
            delete_item_locked_weapon(`.heroe-team__weapon_${i + 1}`);
            check_opened_heroe_open_weapon(`.heroe-team__weapon_${i + 1}`, numbers[i]);
            document.querySelectorAll(`.heroe-team__weapon_${i + 1}`).forEach((el => el.dataset.active = numbers[i]));
        } else {
            for (let i = 0; i < 4; i++) {
                delete_item_locked_weapon(`.heroe-team__weapon_${i + 1}`);
                check_opened_heroe_open_weapon(`.heroe-team__weapon_${i + 1}`, numbers[i]);
                document.querySelectorAll(`.heroe-team__weapon_${i + 1}`).forEach((el => el.dataset.active = numbers[i]));
            }
            document.querySelectorAll(".heroe-team__weapons").forEach((el => {
                if (!el.closest(".heroe-team").classList.contains("_locked")) el.classList.add("_opened");
            }));
        }
    }
    function check_opened_heroe_open_weapon(weapon, num) {
        document.querySelectorAll(weapon).forEach((el => {
            if (!el.closest(".heroe-team").classList.contains("_locked")) {
                let item = create_weapon_box(num);
                el.setAttribute("data-active", num);
                el.append(item);
            }
        }));
    }
    function remove_team_locked_character_box(character) {
        document.querySelectorAll(".heroe-team__box-locked").forEach((el => {
            if (el.closest(character)) el.remove();
        }));
    }
    function open_active_heroes() {
        check_opened_heroe();
    }
    function check_opened_heroe() {
        let heroes = get_arr_storrage("heroes");
        heroes.forEach((el => {
            remove_team_locked_character_box(`.heroe-team__character_${el}`);
            let character = create_character(el);
            document.querySelector(`.heroe-team__character_${el}`).append(character);
            document.querySelectorAll(".heroe-team")[el - 1].classList.remove("_locked");
        }));
    }
    function remove_class_item(block, num, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className) && el.closest(".content-item__heroe").dataset.hero == num) el.classList.remove(className);
        }));
    }
    function change_weapon(number_hero, box, block) {
        let numbers = JSON.parse(sessionStorage.getItem("weapons"));
        let opened_weapons = [];
        let not_active_weapons = [];
        let click_number = box.dataset.active;
        let del_num = 0;
        if (numbers.length > 4) {
            let arr = document.querySelectorAll(".heroe-team__weapon");
            arr.forEach((el => {
                if (el.closest(".content-item__heroe").dataset.hero == number_hero) opened_weapons.push(+el.dataset.active);
            }));
            if (sessionStorage.getItem("not-active-weapons")) not_active_weapons = JSON.parse(sessionStorage.getItem("not-active-weapons")); else numbers.forEach((el => {
                let index = opened_weapons.findIndex((item => {
                    if (item == el) return item;
                }));
                if (-1 == index) not_active_weapons.push(el);
            }));
            del_num = not_active_weapons.shift();
            not_active_weapons.push(+click_number);
            save_arr_storrage(not_active_weapons, "not-active-weapons");
            block.querySelector("img").setAttribute("src", `img/weapons/sword-${del_num}.png`);
            box.dataset.active = del_num;
        }
    }
    function write_bet_info_weapon() {
        document.querySelectorAll(".heroe-team__bet-info").forEach((el => {
            if (!el.closest(".heroe-team").classList.contains("_locked")) {
                let weapon = el.closest(".heroe-team__weapon").dataset.active;
                el.textContent = `x${get_bet_weapon_number(weapon)}`;
            }
        }));
    }
    function get_bet_weapon_number(number) {
        if (1 == number) return "1"; else if (2 == number) return "1.2"; else if (3 == number) return "1.4"; else if (4 == number) return "1.6"; else if (5 == number) return "1.8"; else if (6 == number) return "2"; else if (7 == number) return "2.2"; else if (8 == number) return "2.4"; else if (9 == number) return "2.6"; else if (10 == number) return "2.8"; else if (11 == number) return "3"; else if (12 == number) return "3.2";
    }
    function get_active_weapon(targetElement) {
        let heroe = targetElement.closest(".content-item__heroe").dataset.hero;
        let weapon = 0;
        document.querySelectorAll(".heroe-team__weapon").forEach((el => {
            if (el.closest(".content-item__heroe").dataset.hero == heroe && el.classList.contains("_selected")) weapon = el.dataset.active;
        }));
        if (!sessionStorage.getItem("current-hero-1")) {
            sessionStorage.setItem("current-hero-1", heroe);
            sessionStorage.setItem("current-weapon-1", weapon);
        } else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
            sessionStorage.setItem("current-hero-2", heroe);
            sessionStorage.setItem("current-weapon-2", weapon);
        } else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
            sessionStorage.setItem("current-hero-1", heroe);
            sessionStorage.setItem("current-weapon-1", weapon);
        }
    }
    function check_select_all_heroes() {
        if (sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) document.querySelectorAll(".heroe-team").forEach((el => {
            if (!el.classList.contains("_active") && !el.classList.contains("_locked")) el.classList.add("_hold");
        })); else document.querySelectorAll(".heroe-team").forEach((el => {
            if (el.classList.contains("_hold")) el.classList.remove("_hold");
        }));
    }
    function check_active_heroes_when_open_page() {
        let hero_1 = 0;
        let hero_2 = 0;
        let weapon_1 = 0;
        let weapon_2 = 0;
        if (sessionStorage.getItem("current-hero-1")) hero_1 = +sessionStorage.getItem("current-hero-1");
        if (sessionStorage.getItem("current-hero-2")) hero_2 = +sessionStorage.getItem("current-hero-2");
        if (sessionStorage.getItem("current-weapon-1")) weapon_1 = +sessionStorage.getItem("current-weapon-1");
        if (sessionStorage.getItem("current-weapon-2")) weapon_2 = +sessionStorage.getItem("current-weapon-2");
        document.querySelectorAll(".heroe-team").forEach((el => {
            if (el.dataset.hero == hero_1) el.classList.add("_active");
            if (el.dataset.hero == hero_2) el.classList.add("_active");
        }));
        document.querySelectorAll(".heroe-team__button-box").forEach((el => {
            if (el.closest(".heroe-team").dataset.hero == hero_1 && el.closest(".heroe-team__weapon").dataset.active == weapon_1) {
                el.closest(".heroe-team__weapons").classList.add("_hold");
                el.classList.add("_selected");
                el.closest(".heroe-team__weapon").classList.add("_selected");
                el.closest(".heroe-team__weapons").classList.add("_selected");
            }
            if (el.closest(".heroe-team").dataset.hero == hero_2 && el.closest(".heroe-team__weapon").dataset.active == weapon_2) {
                el.closest(".heroe-team__weapons").classList.add("_hold");
                el.classList.add("_selected");
                el.closest(".heroe-team__weapon").classList.add("_selected");
                el.closest(".heroe-team__weapons").classList.add("_selected");
            }
        }));
    }
    function save_position_weapons_when_exit() {
        document.querySelectorAll(".heroe-team").forEach((el => {
            if (!el.classList.contains("_locked")) {
                let arr = [];
                document.querySelectorAll(".heroe-team__weapon").forEach((item => {
                    if (item.closest(".heroe-team").dataset.hero == el.dataset.hero) arr.push(+item.dataset.active);
                }));
                save_arr_storrage(arr, `weapon-${el.dataset.hero}`);
            }
        }));
    }
    function check_position_weapons_when_open_page() {
        if (sessionStorage.getItem("weapon-1") || sessionStorage.getItem("weapon-2") || sessionStorage.getItem("weapon-3") || sessionStorage.getItem("weapon-4") || sessionStorage.getItem("weapon-5") || sessionStorage.getItem("weapon-6") || sessionStorage.getItem("weapon-7") || sessionStorage.getItem("weapon-8") || sessionStorage.getItem("weapon-9") || sessionStorage.getItem("weapon-10") || sessionStorage.getItem("weapon-11") || sessionStorage.getItem("weapon-12")) document.querySelectorAll(".heroe-team").forEach((el => {
            if (!el.classList.contains("_locked")) {
                let arr = [];
                let arr_2 = [];
                document.querySelectorAll(".heroe-team__sword").forEach((item => {
                    if (item.closest(".heroe-team").dataset.hero == el.dataset.hero) if (sessionStorage.getItem(`weapon-${el.dataset.hero}`)) {
                        arr = get_arr_storrage(`weapon-${el.dataset.hero}`);
                        arr_2.push(item);
                    }
                }));
                arr_2.forEach(((item, i) => {
                    item.querySelector("img").setAttribute("src", `img/weapons/sword-${arr[i]}.png`);
                    item.closest(".heroe-team__weapon").dataset.active = arr[i];
                }));
            }
        }));
    }
    const price_hero = {
        hero_2: 3e3,
        hero_3: 5e3,
        hero_4: 8e3,
        hero_5: 11e3,
        hero_6: 14e3,
        hero_7: 17e3,
        hero_8: 2e4
    };
    const price_weapons = {
        weapon_2: 1e3,
        weapon_3: 2e3,
        weapon_4: 3e3,
        weapon_5: 4e3,
        weapon_6: 5e3,
        weapon_7: 6e3,
        weapon_8: 7e3,
        weapon_9: 8e3,
        weapon_10: 9e3,
        weapon_11: 1e4,
        weapon_12: 11e3
    };
    const weapon_damage_coeff = {
        weapon_1: 1,
        weapon_2: 1.05,
        weapon_3: 1.1,
        weapon_4: 1.2,
        weapon_5: 1.3,
        weapon_6: 1.4,
        weapon_7: 1.5,
        weapon_8: 1.6,
        weapon_9: 1.7,
        weapon_10: 1.8,
        weapon_11: 1.9,
        weapon_12: 2
    };
    if (document.querySelector(".shop") && sessionStorage.getItem("preloader")) {
        if (window_height > 600) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) document.querySelector(".content-item__bg source").setAttribute("srcset", "img/other/board-big.webp"); else document.querySelector(".content-item__bg img").setAttribute("src", "img/other/board-big.png");
        }), 100);
        write_prices_heroes();
        write_prices_weapons();
        check_bought_heroes();
        check_bought_weapons();
    } else if (document.querySelector(".shop") && !sessionStorage.getItem("preloader")) location.href = "index.html";
    function write_prices_heroes() {
        document.querySelectorAll(".item-heroes__button-price")[0].textContent = price_hero.hero_2;
        document.querySelectorAll(".item-heroes__button-price")[1].textContent = price_hero.hero_3;
        document.querySelectorAll(".item-heroes__button-price")[2].textContent = price_hero.hero_4;
        document.querySelectorAll(".item-heroes__button-price")[3].textContent = price_hero.hero_5;
        document.querySelectorAll(".item-heroes__button-price")[4].textContent = price_hero.hero_6;
        document.querySelectorAll(".item-heroes__button-price")[5].textContent = price_hero.hero_7;
        document.querySelectorAll(".item-heroes__button-price")[6].textContent = price_hero.hero_8;
    }
    function write_prices_weapons() {
        document.querySelectorAll(".item-weapons__button-price")[0].textContent = price_weapons.weapon_2;
        document.querySelectorAll(".item-weapons__button-price")[1].textContent = price_weapons.weapon_3;
        document.querySelectorAll(".item-weapons__button-price")[2].textContent = price_weapons.weapon_4;
        document.querySelectorAll(".item-weapons__button-price")[3].textContent = price_weapons.weapon_5;
        document.querySelectorAll(".item-weapons__button-price")[4].textContent = price_weapons.weapon_6;
        document.querySelectorAll(".item-weapons__button-price")[5].textContent = price_weapons.weapon_7;
        document.querySelectorAll(".item-weapons__button-price")[6].textContent = price_weapons.weapon_8;
        document.querySelectorAll(".item-weapons__button-price")[7].textContent = price_weapons.weapon_9;
        document.querySelectorAll(".item-weapons__button-price")[8].textContent = price_weapons.weapon_10;
        document.querySelectorAll(".item-weapons__button-price")[9].textContent = price_weapons.weapon_11;
        document.querySelectorAll(".item-weapons__button-price")[10].textContent = price_weapons.weapon_12;
    }
    function chek_buy_hero(number) {
        if (2 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_2) {
            delete_money(price_hero.hero_2, ".check");
            add_number_storrage("heroes", 2);
        } else no_money(".check"); else if (3 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_3) {
            delete_money(price_hero.hero_3, ".check");
            add_number_storrage("heroes", 3);
        } else no_money(".check"); else if (4 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_4) {
            delete_money(price_hero.hero_4, ".check");
            add_number_storrage("heroes", 4);
        } else no_money(".check"); else if (5 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_5) {
            delete_money(price_hero.hero_5, ".check");
            add_number_storrage("heroes", 5);
        } else no_money(".check"); else if (6 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_6) {
            delete_money(price_hero.hero_6, ".check");
            add_number_storrage("heroes", 6);
        } else no_money(".check"); else if (7 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_7) {
            delete_money(price_hero.hero_7, ".check");
            add_number_storrage("heroes", 7);
        } else no_money(".check"); else if (8 == number) if (+sessionStorage.getItem("money") >= price_hero.hero_8) {
            delete_money(price_hero.hero_8, ".check");
            add_number_storrage("heroes", 8);
        } else no_money(".check");
        check_bought_heroes();
    }
    function chek_buy_weapon(number) {
        if (2 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_2) {
            delete_money(price_weapons.weapon_2, ".check");
            add_number_storrage("weapons", 2);
        } else no_money(".check"); else if (3 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_3) {
            delete_money(price_weapons.weapon_3, ".check");
            add_number_storrage("weapons", 3);
        } else no_money(".check"); else if (4 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_4) {
            delete_money(price_weapons.weapon_4, ".check");
            add_number_storrage("weapons", 4);
        } else no_money(".check"); else if (5 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_5) {
            delete_money(price_weapons.weapon_5, ".check");
            add_number_storrage("weapons", 5);
        } else no_money(".check"); else if (6 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_6) {
            delete_money(price_weapons.weapon_6, ".check");
            add_number_storrage("weapons", 6);
        } else no_money(".check"); else if (7 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_7) {
            delete_money(price_weapons.weapon_7, ".check");
            add_number_storrage("weapons", 7);
        } else no_money(".check"); else if (8 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_8) {
            delete_money(price_weapons.weapon_8, ".check");
            add_number_storrage("weapons", 8);
        } else no_money(".check"); else if (9 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_9) {
            delete_money(price_weapons.weapon_9, ".check");
            add_number_storrage("weapons", 9);
        } else no_money(".check"); else if (10 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_10) {
            delete_money(price_weapons.weapon_10, ".check");
            add_number_storrage("weapons", 10);
        } else no_money(".check"); else if (11 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_11) {
            delete_money(price_weapons.weapon_11, ".check");
            add_number_storrage("weapons", 11);
        } else no_money(".check"); else if (12 == number) if (+sessionStorage.getItem("money") >= price_weapons.weapon_12) {
            delete_money(price_weapons.weapon_12, ".check");
            add_number_storrage("weapons", 12);
        } else no_money(".check");
        check_bought_weapons();
    }
    function check_bought_heroes() {
        let heroes = get_arr_storrage("heroes");
        heroes.forEach((el => {
            document.querySelectorAll(".item-heroes__button-box")[el - 2].classList.add("_hide");
        }));
    }
    function check_bought_weapons() {
        let weapons = get_arr_storrage("weapons");
        weapons.forEach((el => {
            if (el > 1) document.querySelectorAll(".item-weapons__button-box")[el - 2].classList.add("_hide");
        }));
    }
    const config_game = {
        level: +sessionStorage.getItem("current-level"),
        goal: 1,
        start_life_hero_1: 0,
        start_life_hero_2: 0,
        start_life_enemy_1: 0,
        start_life_enemy_2: 0,
        current_life_hero_1: 0,
        current_life_hero_2: 0,
        current_life_enemy_1: 0,
        current_life_enemy_2: 0,
        damage_hero_1: 0,
        damage_hero_2: 0,
        damage_enemy_1: 0,
        damage_enemy_2: 0,
        stop_game: false
    };
    const health_heroes = {
        hero_1: 200,
        hero_2: 300,
        hero_3: 400,
        hero_4: 500,
        hero_5: 600,
        hero_6: 700,
        hero_7: 800,
        hero_8: 1e3
    };
    const health_enemys = {
        enemy_1: 180,
        enemy_2: 280,
        enemy_3: 380,
        enemy_4: 480,
        enemy_5: 580,
        enemy_6: 680,
        enemy_7: 780,
        enemy_8: 1e3
    };
    const damage_heroes = {
        hero_1: 50,
        hero_2: 60,
        hero_3: 70,
        hero_4: 80,
        hero_5: 90,
        hero_6: 100,
        hero_7: 110,
        hero_8: 120
    };
    const damage_enemys = {
        enemy_1: 60,
        enemy_2: 80,
        enemy_3: 100,
        enemy_4: 120,
        enemy_5: 140,
        enemy_6: 160,
        enemy_7: 180,
        enemy_8: 250
    };
    if (document.querySelector(".game") && sessionStorage.getItem("preloader")) {
        document.querySelector(".info-game__level p").textContent = `Level ${config_game.level}`;
        select_write_enemys();
        select_write_heroes();
        write_start_characterisitcs();
        if (3 == +sessionStorage.getItem("current-level")) document.querySelector(".field__image_1").style.width = "100%";
    } else if (document.querySelector(".game") && !sessionStorage.getItem("preloader")) location.href = "index.html";
    function select_write_enemys() {
        if (1 == config_game.level) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__image_1 source").setAttribute("srcset", "img/enemys/enemy-1.webp");
                document.querySelector(".field__image_2 source").setAttribute("srcset", "img/enemys/enemy-2.webp");
            } else {
                document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-1.png");
                document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-2.png");
            }
        }), 100); else if (2 == config_game.level) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__image_1 source").setAttribute("srcset", "img/enemys/enemy-3.webp");
                document.querySelector(".field__image_2 source").setAttribute("srcset", "img/enemys/enemy-4.webp");
            } else {
                document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-3.png");
                document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-4.png");
            }
        }), 100); else if (3 == config_game.level) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__image_1 source").setAttribute("srcset", "img/enemys/enemy-5.webp");
                document.querySelector(".field__image_2 source").setAttribute("srcset", "img/enemys/enemy-6.webp");
            } else {
                document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-5.png");
                document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-6.png");
            }
        }), 100); else if (4 == config_game.level) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__image_1 source").setAttribute("srcset", "img/enemys/enemy-7.webp");
                document.querySelector(".field__image_2 source").setAttribute("srcset", "img/enemys/enemy-8.webp");
            } else {
                document.querySelector(".field__image_1 img").setAttribute("src", "img/enemys/enemy-7.png");
                document.querySelector(".field__image_2 img").setAttribute("src", "img/enemys/enemy-8.png");
            }
        }), 100);
    }
    function select_write_heroes() {
        if (sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__man_1 source").setAttribute("srcset", `img/heroes/hero-${sessionStorage.getItem("current-hero-1")}.webp`);
                document.querySelector(".field__man_2 source").setAttribute("srcset", `img/heroes/hero-${sessionStorage.getItem("current-hero-2")}.webp`);
                document.querySelector(".field__sword_1 source").setAttribute("srcset", `img/weapons/sword-${sessionStorage.getItem("current-weapon-1")}.webp`);
                document.querySelector(".field__sword_2 source").setAttribute("srcset", `img/weapons/sword-${sessionStorage.getItem("current-weapon-2")}.webp`);
            } else {
                document.querySelector(".field__man_1 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-1")}.png`);
                document.querySelector(".field__man_2 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-2")}.png`);
                document.querySelector(".field__sword_1 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-1")}.png`);
                document.querySelector(".field__sword_2 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-2")}.png`);
            }
        }), 100); else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__man_1 source").setAttribute("srcset", `img/heroes/hero-${sessionStorage.getItem("current-hero-1")}.webp`);
                document.querySelector(".field__sword_1 source").setAttribute("srcset", `img/weapons/sword-${sessionStorage.getItem("current-weapon-1")}.webp`);
            } else {
                document.querySelector(".field__man_1 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-1")}.png`);
                document.querySelector(".field__sword_1 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-1")}.png`);
            }
        }), 100); else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".field__man_2 source").setAttribute("srcset", `img/heroes/hero-${sessionStorage.getItem("current-hero-2")}.webp`);
                document.querySelector(".field__sword_2 source").setAttribute("srcset", `img/weapons/sword-${sessionStorage.getItem("current-weapon-2")}.webp`);
            } else {
                document.querySelector(".field__man_2 img").setAttribute("src", `img/heroes/hero-${sessionStorage.getItem("current-hero-2")}.png`);
                document.querySelector(".field__sword_2 img").setAttribute("src", `img/weapons/sword-${sessionStorage.getItem("current-weapon-2")}.png`);
            }
        }), 100);
    }
    function write_start_characterisitcs() {
        write_life_damage_hero_1();
        write_life_damage_hero_2();
        write_life_damage_enemys();
        write_damage_hero_1();
        write_damage_hero_2();
    }
    function write_life_damage_hero_1() {
        if (sessionStorage.getItem("current-hero-1")) {
            let hero_1 = +sessionStorage.getItem("current-hero-1");
            if (1 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_1;
                config_game.damage_hero_1 = damage_heroes.hero_1;
            } else if (2 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_2;
                config_game.damage_hero_1 = damage_heroes.hero_2;
            } else if (3 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_3;
                config_game.damage_hero_1 = damage_heroes.hero_3;
            } else if (4 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_4;
                config_game.damage_hero_1 = damage_heroes.hero_4;
            } else if (5 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_5;
                config_game.damage_hero_1 = damage_heroes.hero_5;
            } else if (6 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_6;
                config_game.damage_hero_1 = damage_heroes.hero_6;
            } else if (7 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_7;
                config_game.damage_hero_1 = damage_heroes.hero_7;
            } else if (8 == hero_1) {
                config_game.start_life_hero_1 = health_heroes.hero_8;
                config_game.damage_hero_1 = damage_heroes.hero_8;
            }
        } else {
            config_game.start_life_hero_1 = health_heroes.hero_1;
            config_game.damage_hero_1 = damage_heroes.hero_1;
        }
        config_game.current_life_hero_1 = config_game.start_life_hero_1;
    }
    function write_life_damage_hero_2() {
        if (sessionStorage.getItem("current-hero-2")) {
            let hero_2 = +sessionStorage.getItem("current-hero-2");
            if (1 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_1;
                config_game.damage_hero_2 = damage_heroes.hero_1;
            } else if (2 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_2;
                config_game.damage_hero_2 = damage_heroes.hero_2;
            } else if (3 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_3;
                config_game.damage_hero_2 = damage_heroes.hero_3;
            } else if (4 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_4;
                config_game.damage_hero_2 = damage_heroes.hero_4;
            } else if (5 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_5;
                config_game.damage_hero_2 = damage_heroes.hero_5;
            } else if (6 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_6;
                config_game.damage_hero_2 = damage_heroes.hero_6;
            } else if (7 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_7;
                config_game.damage_hero_2 = damage_heroes.hero_7;
            } else if (8 == hero_2) {
                config_game.start_life_hero_2 = health_heroes.hero_8;
                config_game.damage_hero_2 = damage_heroes.hero_8;
            }
        } else {
            config_game.start_life_hero_2 = health_heroes.hero_1;
            config_game.damage_hero_2 = damage_heroes.hero_1;
        }
        config_game.current_life_hero_2 = config_game.start_life_hero_2;
    }
    function write_life_damage_enemys() {
        let level = +sessionStorage.getItem("current-level");
        let coeff = get_random_2(.7, 1);
        if (1 == level) {
            config_game.start_life_enemy_1 = Math.floor(health_enemys.enemy_1 * coeff);
            config_game.damage_enemy_1 = damage_enemys.enemy_1;
            config_game.start_life_enemy_2 = Math.floor(health_enemys.enemy_2 * coeff);
            config_game.damage_enemy_2 = damage_enemys.enemy_2;
        } else if (2 == level) {
            config_game.start_life_enemy_1 = Math.floor(health_enemys.enemy_3 * coeff);
            config_game.damage_enemy_1 = damage_enemys.enemy_3;
            config_game.start_life_enemy_2 = Math.floor(health_enemys.enemy_4 * coeff);
            config_game.damage_enemy_2 = damage_enemys.enemy_4;
        } else if (3 == level) {
            config_game.start_life_enemy_1 = Math.floor(health_enemys.enemy_5 * coeff);
            config_game.damage_enemy_1 = damage_enemys.enemy_5;
            config_game.start_life_enemy_2 = Math.floor(health_enemys.enemy_6 * coeff);
            config_game.damage_enemy_2 = damage_enemys.enemy_6;
        } else if (4 == level) {
            config_game.start_life_enemy_1 = Math.floor(health_enemys.enemy_7 * coeff);
            config_game.damage_enemy_1 = damage_enemys.enemy_7;
            config_game.start_life_enemy_2 = Math.floor(health_enemys.enemy_8 * coeff);
            config_game.damage_enemy_2 = damage_enemys.enemy_8;
        }
        config_game.current_life_enemy_1 = config_game.start_life_enemy_1;
        config_game.current_life_enemy_2 = config_game.start_life_enemy_2;
    }
    function write_damage_hero_1() {
        if (sessionStorage.getItem("current-weapon-1")) {
            let weapon_1 = +sessionStorage.getItem("current-weapon-1");
            if (1 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_1; else if (2 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_2; else if (3 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_3; else if (4 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_4; else if (5 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_5; else if (6 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_6; else if (7 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_7; else if (8 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_8; else if (9 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_9; else if (10 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_10; else if (11 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_11; else if (12 == weapon_1) config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_12;
        } else config_game.damage_hero_1 = config_game.damage_hero_1 * weapon_damage_coeff.weapon_1;
    }
    function write_damage_hero_2() {
        if (sessionStorage.getItem("current-weapon-2")) {
            let weapon_2 = +sessionStorage.getItem("current-weapon-2");
            if (1 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_1; else if (2 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_2; else if (3 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_3; else if (4 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_4; else if (5 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_5; else if (6 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_6; else if (7 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_7; else if (8 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_8; else if (9 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_9; else if (10 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_10; else if (11 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_11; else if (12 == weapon_2) config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_12;
        } else config_game.damage_hero_2 = config_game.damage_hero_2 * weapon_damage_coeff.weapon_1;
    }
    function get_random_anim_when_shot(item, number) {
        let arr = [ 1, 2, 3 ];
        let num = get_random(0, 3);
        if (1 == number) {
            document.querySelector(item).classList.add(`_hit-${arr[num]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_hit-${arr[num]}`);
            }), 1e3);
        } else if (2 == number) {
            arr = [ 4, 5, 6 ];
            document.querySelector(item).classList.add(`_hit-${arr[num]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_hit-${arr[num]}`);
            }), 1e3);
        }
    }
    function check_damage_heroes() {
        if (1 == config_game.goal) if (!document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_1", 2);
            }), 2500);
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_2", 2);
            }), 3e3);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.7, 1);
                let coeff_atack_2 = get_random_2(.7, 1);
                config_game.current_life_enemy_1 = config_game.current_life_enemy_1 - config_game.damage_hero_1 * coeff_atack_1;
                config_game.current_life_enemy_2 = config_game.current_life_enemy_2 - config_game.damage_hero_2 * coeff_atack_2;
                document.querySelector(".field__enemy-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_enemy_1, config_game.current_life_enemy_1)}%`;
                create_damage_info(".field__evil_1", 1, Math.floor(config_game.damage_hero_1 * coeff_atack_1));
                setTimeout((() => {
                    document.querySelector(".field__enemy-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_enemy_2, config_game.current_life_enemy_2)}%`;
                    create_damage_info(".field__evil_2", 2, Math.floor(config_game.damage_hero_2 * coeff_atack_2));
                }), 500);
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_1", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.7, 1);
                let coeff_atack_2 = get_random_2(.7, 1);
                config_game.current_life_enemy_1 = config_game.current_life_enemy_1 - config_game.damage_hero_1 * coeff_atack_1 - config_game.damage_hero_2 * coeff_atack_2;
                document.querySelector(".field__enemy-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_enemy_1, config_game.current_life_enemy_1)}%`;
                create_damage_info(".field__evil_1", 1, Math.floor(config_game.damage_hero_1 * coeff_atack_1 + config_game.damage_hero_2 * coeff_atack_2));
            }), 3e3);
        } else if (document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_2", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.7, 1);
                let coeff_atack_2 = get_random_2(.7, 1);
                config_game.current_life_enemy_2 = config_game.current_life_enemy_2 - config_game.damage_hero_1 * coeff_atack_1 - config_game.damage_hero_2 * coeff_atack_2;
                document.querySelector(".field__enemy-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_enemy_2, config_game.current_life_enemy_2)}%`;
                create_damage_info(".field__evil_2", 2, Math.floor(config_game.damage_hero_1 * coeff_atack_1 + config_game.damage_hero_2 * coeff_atack_2));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_2", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_2 = get_random_2(.7, 1);
                config_game.current_life_enemy_2 = config_game.current_life_enemy_2 - config_game.damage_hero_2 * coeff_atack_2;
                document.querySelector(".field__enemy-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_enemy_2, config_game.current_life_enemy_2)}%`;
                create_damage_info(".field__evil_2", 2, Math.floor(config_game.damage_hero_2 * coeff_atack_2));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_1", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.7, 1);
                config_game.current_life_enemy_1 = config_game.current_life_enemy_1 - config_game.damage_hero_1 * coeff_atack_1;
                document.querySelector(".field__enemy-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_enemy_1, config_game.current_life_enemy_1)}%`;
                create_damage_info(".field__evil_1", 1, Math.floor(config_game.damage_hero_1 * coeff_atack_1));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_1", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.7, 1);
                config_game.current_life_enemy_1 = config_game.current_life_enemy_1 - config_game.damage_hero_1 * coeff_atack_1;
                document.querySelector(".field__enemy-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_enemy_1, config_game.current_life_enemy_1)}%`;
                create_damage_info(".field__evil_1", 1, Math.floor(config_game.damage_hero_1 * coeff_atack_1));
            }), 3e3);
        } else if (document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_2", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.7, 1);
                config_game.current_life_enemy_2 = config_game.current_life_enemy_2 - config_game.damage_hero_1 * coeff_atack_1;
                document.querySelector(".field__enemy-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_enemy_2, config_game.current_life_enemy_2)}%`;
                create_damage_info(".field__evil_2", 2, Math.floor(config_game.damage_hero_1 * coeff_atack_1));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose") && document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_1", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_2 = get_random_2(.7, 1);
                config_game.current_life_enemy_1 = config_game.current_life_enemy_1 - config_game.damage_hero_2 * coeff_atack_2;
                document.querySelector(".field__enemy-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_enemy_1, config_game.current_life_enemy_1)}%`;
                create_damage_info(".field__evil_1", 1, Math.floor(config_game.damage_hero_2 * coeff_atack_2));
            }), 3e3);
        } else if (document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__evil_2", 2);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_2 = get_random_2(.7, 1);
                config_game.current_life_enemy_2 = config_game.current_life_enemy_2 - config_game.damage_hero_2 * coeff_atack_2;
                document.querySelector(".field__enemy-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_enemy_2, config_game.current_life_enemy_2)}%`;
                create_damage_info(".field__evil_2", 2, Math.floor(config_game.damage_hero_2 * coeff_atack_2));
            }), 3e3);
        }
    }
    function check_damage_enemys() {
        if (2 == config_game.goal) if (!document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_1", 1);
            }), 2500);
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_2", 1);
            }), 3e3);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.5, 1);
                let coeff_atack_2 = get_random_2(.5, 1);
                config_game.current_life_hero_1 = config_game.current_life_hero_1 - config_game.damage_enemy_1 * coeff_atack_1;
                config_game.current_life_hero_2 = config_game.current_life_hero_2 - config_game.damage_enemy_2 * coeff_atack_2;
                document.querySelector(".field__hero-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_hero_1, config_game.current_life_hero_1)}%`;
                create_damage_info(".field__heroe-inner_1", 1, Math.floor(config_game.damage_enemy_1 * coeff_atack_1));
                setTimeout((() => {
                    document.querySelector(".field__hero-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_hero_2, config_game.current_life_hero_2)}%`;
                    create_damage_info(".field__heroe-inner_2", 2, Math.floor(config_game.damage_enemy_2 * coeff_atack_2));
                }), 500);
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_1", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.5, 1);
                config_game.current_life_hero_1 = config_game.current_life_hero_1 - config_game.damage_enemy_1 * coeff_atack_1;
                document.querySelector(".field__hero-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_hero_1, config_game.current_life_hero_1)}%`;
                create_damage_info(".field__heroe-inner_1", 1, Math.floor(config_game.damage_enemy_1 * coeff_atack_1));
            }), 3e3);
        } else if (document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_2", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_2 = get_random_2(.5, 1);
                config_game.current_life_hero_2 = config_game.current_life_hero_2 - config_game.damage_enemy_2 * coeff_atack_2;
                document.querySelector(".field__hero-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_hero_2, config_game.current_life_hero_2)}%`;
                create_damage_info(".field__heroe-inner_2", 2, Math.floor(config_game.damage_enemy_2 * coeff_atack_2));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_2", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.5, 1);
                let coeff_atack_2 = get_random_2(.5, 1);
                config_game.current_life_hero_2 = config_game.current_life_hero_2 - config_game.damage_enemy_2 * coeff_atack_2 - config_game.damage_enemy_1 * coeff_atack_1;
                document.querySelector(".field__hero-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_hero_2, config_game.current_life_hero_2)}%`;
                create_damage_info(".field__heroe-inner_2", 2, Math.floor(config_game.damage_enemy_2 * coeff_atack_2));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_1", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.5, 1);
                let coeff_atack_2 = get_random_2(.5, 1);
                config_game.current_life_hero_1 = config_game.current_life_hero_1 - config_game.damage_enemy_1 * coeff_atack_1 - config_game.damage_enemy_2 * coeff_atack_2;
                document.querySelector(".field__hero-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_hero_1, config_game.current_life_hero_1)}%`;
                create_damage_info(".field__heroe-inner_1", 1, Math.floor(config_game.damage_enemy_1 * coeff_atack_1));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_1", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.5, 1);
                config_game.current_life_hero_1 = config_game.current_life_hero_1 - config_game.damage_enemy_1 * coeff_atack_1;
                document.querySelector(".field__hero-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_hero_1, config_game.current_life_hero_1)}%`;
                create_damage_info(".field__heroe-inner_1", 1, Math.floor(config_game.damage_enemy_1 * coeff_atack_1));
            }), 3e3);
        } else if (document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_1", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_2 = get_random_2(.5, 1);
                config_game.current_life_hero_1 = config_game.current_life_hero_1 - config_game.damage_enemy_2 * coeff_atack_2;
                document.querySelector(".field__hero-energy_1").style.width = `${transl_num_to_percent(config_game.start_life_hero_1, config_game.current_life_hero_1)}%`;
                create_damage_info(".field__heroe-inner_1", 1, Math.floor(config_game.damage_enemy_2 * coeff_atack_2));
            }), 3e3);
        } else if (!document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose") && document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_2", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_1 = get_random_2(.5, 1);
                config_game.current_life_hero_2 = config_game.current_life_hero_2 - config_game.damage_enemy_1 * coeff_atack_1;
                document.querySelector(".field__hero-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_hero_2, config_game.current_life_hero_2)}%`;
                create_damage_info(".field__heroe-inner_2", 2, Math.floor(config_game.damage_enemy_1 * coeff_atack_1));
            }), 3e3);
        } else if (document.querySelector(".field__evil_1").classList.contains("_loose") && !document.querySelector(".field__evil_2").classList.contains("_loose") && document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            setTimeout((() => {
                get_random_anim_when_shot(".field__heroe-inner_2", 1);
            }), 2500);
            setTimeout((() => {
                let coeff_atack_2 = get_random_2(.5, 1);
                config_game.current_life_hero_2 = config_game.current_life_hero_2 - config_game.damage_enemy_2 * coeff_atack_2;
                document.querySelector(".field__hero-energy_2").style.width = `${transl_num_to_percent(config_game.start_life_hero_2, config_game.current_life_hero_2)}%`;
                create_damage_info(".field__heroe-inner_2", 2, Math.floor(config_game.damage_enemy_2 * coeff_atack_2));
            }), 3e3);
        }
    }
    function create_damage_info(item, num_turn, count) {
        let text = document.createElement("div");
        text.classList.add("field__text");
        if (1 == num_turn) text.classList.add("field__text_left"); else if (2 == num_turn) text.classList.add("field__text_right");
        text.textContent = `-${count}hp`;
        document.querySelector(item).append(text);
        setTimeout((() => {
            text.remove();
        }), 1600);
    }
    function check_game_over() {
        check_write_energy_and_image_when_loose();
        check_loose_all_heroes();
        check_loose_all_enemys();
    }
    function check_write_energy_and_image_when_loose() {
        if (config_game.current_life_enemy_1 < 0) {
            config_game.current_life_enemy_1 = 0;
            document.querySelector(".field__enemy-energy_1").style.width = `0%`;
            change_image_if_dead(".field__image_1");
            document.querySelector(".field__evil_1").classList.add("_loose");
        }
        if (config_game.current_life_enemy_2 < 0) {
            config_game.current_life_enemy_2 = 0;
            document.querySelector(".field__enemy-energy_2").style.width = `0%`;
            change_image_if_dead(".field__image_2");
            document.querySelector(".field__evil_2").classList.add("_loose");
        }
        if (config_game.current_life_hero_1 < 0) {
            config_game.current_life_hero_1 = 0;
            document.querySelector(".field__hero-energy_1").style.width = `0%`;
            if (document.querySelector(".field__weapon-item_1")) document.querySelector(".field__weapon-item_1").remove();
            change_image_if_dead(".field__man_1");
            document.querySelector(".field__heroe-inner_1").classList.add("_loose");
        }
        if (config_game.current_life_hero_2 < 0) {
            config_game.current_life_hero_2 = 0;
            document.querySelector(".field__hero-energy_2").style.width = `0%`;
            if (document.querySelector(".field__weapon-item_2")) document.querySelector(".field__weapon-item_2").remove();
            change_image_if_dead(".field__man_2");
            document.querySelector(".field__heroe-inner_2").classList.add("_loose");
        }
    }
    function change_image_if_dead(item) {
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) document.querySelector(`${item} source`).setAttribute("srcset", "img/icons/gameover.webp"); else document.querySelector(`${item} img`).setAttribute("src", "img/icons/gameover.png");
        }), 100);
        document.querySelector(item).classList.add("_loose");
        if (document.querySelector(item).closest(".field__evil")) document.querySelector(item).closest(".field__evil").classList.add("_loose"); else if (document.querySelector(item).closest(".field__heroe-inner")) document.querySelector(item).closest(".field__heroe-inner").classList.add("_loose");
    }
    function check_loose_all_heroes() {
        if (document.querySelector(".field__heroe-inner_1").classList.contains("_loose") && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            config_game.stop_game = true;
            write_enemys_when_loose();
            setTimeout((() => {
                document.querySelector(".loose").classList.remove("_hide");
            }), 500);
        }
    }
    function check_loose_all_enemys() {
        if (document.querySelector(".field__evil_1").classList.contains("_loose") && document.querySelector(".field__evil_2").classList.contains("_loose")) {
            config_game.stop_game = true;
            write_info_when_win();
            setTimeout((() => {
                document.querySelector(".win").classList.remove("_hide");
            }), 1e3);
        }
    }
    function write_enemys_when_loose() {
        if (1 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".loose__image_1 source").setAttribute("srcset", "img/enemys/enemy-1.webp");
                document.querySelector(".loose__image_2 source").setAttribute("srcset", "img/enemys/enemy-2.webp");
            } else {
                document.querySelector(".loose__image_1 img").setAttribute("src", "img/enemys/enemy-1.png");
                document.querySelector(".loose__image_2 img").setAttribute("src", "img/enemys/enemy-2.png");
            }
        }), 100); else if (2 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".loose__image_1 source").setAttribute("srcset", "img/enemys/enemy-3.webp");
                document.querySelector(".loose__image_2 source").setAttribute("srcset", "img/enemys/enemy-4.webp");
            } else {
                document.querySelector(".loose__image_1 img").setAttribute("src", "img/enemys/enemy-3.png");
                document.querySelector(".loose__image_2 img").setAttribute("src", "img/enemys/enemy-4.png");
            }
        }), 100); else if (3 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".loose__image_1 source").setAttribute("srcset", "img/enemys/enemy-5.webp");
                document.querySelector(".loose__image_2 source").setAttribute("srcset", "img/enemys/enemy-6.webp");
            } else {
                document.querySelector(".loose__image_1 img").setAttribute("src", "img/enemys/enemy-5.png");
                document.querySelector(".loose__image_2 img").setAttribute("src", "img/enemys/enemy-6.png");
            }
        }), 100); else if (4 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelector(".loose__image_1 source").setAttribute("srcset", "img/enemys/enemy-7.webp");
                document.querySelector(".loose__image_2 source").setAttribute("srcset", "img/enemys/enemy-8.webp");
            } else {
                document.querySelector(".loose__image_1 img").setAttribute("src", "img/enemys/enemy-7.png");
                document.querySelector(".loose__image_2 img").setAttribute("src", "img/enemys/enemy-8.png");
            }
        }), 100);
    }
    function get_hero_bet_coeff(number) {
        if (1 == number) return 1; else if (2 == number) return 1.1; else if (3 == number) return 1.2; else if (4 == number) return 1.3; else if (5 == number) return 1.4; else if (6 == number) return 1.5; else if (7 == number) return 1.6; else if (8 == number) return 1.7;
    }
    function get_weapon_bet_coeff(number) {
        if (1 == number) return 1; else if (2 == number) return 1.1; else if (3 == number) return 1.2; else if (4 == number) return 1.3; else if (5 == number) return 1.4; else if (6 == number) return 1.5; else if (7 == number) return 1.6; else if (8 == number) return 1.7; else if (9 == number) return 1.8; else if (10 == number) return 1.9; else if (11 == number) return 2; else if (12 == number) return 2.1;
    }
    function write_info_when_win() {
        let current_bet = +sessionStorage.getItem("current-bet");
        let current_hero_1 = 1;
        let current_weapon_1 = 1;
        let current_hero_2 = 1;
        let current_weapon_2 = 1;
        if (sessionStorage.getItem("current-hero-1")) {
            current_hero_1 = +sessionStorage.getItem("current-hero-1");
            current_weapon_1 = +sessionStorage.getItem("current-weapon-1");
        }
        if (sessionStorage.getItem("current-hero-2")) {
            current_hero_2 = +sessionStorage.getItem("current-hero-2");
            current_weapon_2 = +sessionStorage.getItem("current-weapon-2");
        }
        if (1 == +sessionStorage.getItem("current-level")) {
            let count_win = Math.floor(1.1 * current_bet * get_hero_bet_coeff(current_hero_1) * get_hero_bet_coeff(current_hero_2) * get_weapon_bet_coeff(current_weapon_1) * get_weapon_bet_coeff(current_weapon_2));
            add_money(count_win, ".check", 1e3, 2e3);
            document.querySelector(".win__count").textContent = count_win;
        } else if (2 == +sessionStorage.getItem("current-level")) {
            let count_win = Math.floor(1.2 * current_bet * get_hero_bet_coeff(current_hero_1) * get_hero_bet_coeff(current_hero_2) * get_weapon_bet_coeff(current_weapon_1) * get_weapon_bet_coeff(current_weapon_2));
            add_money(count_win, ".check", 1e3, 2e3);
            document.querySelector(".win__count").textContent = count_win;
        } else if (3 == +sessionStorage.getItem("current-level")) {
            let count_win = Math.floor(1.3 * current_bet * get_hero_bet_coeff(current_hero_1) * get_hero_bet_coeff(current_hero_2) * get_weapon_bet_coeff(current_weapon_1) * get_weapon_bet_coeff(current_weapon_2));
            add_money(count_win, ".check", 1e3, 2e3);
            document.querySelector(".win__count").textContent = count_win;
        } else if (4 == +sessionStorage.getItem("current-level")) {
            let count_win = Math.floor(1.4 * current_bet * get_hero_bet_coeff(current_hero_1) * get_hero_bet_coeff(current_hero_2) * get_weapon_bet_coeff(current_weapon_1) * get_weapon_bet_coeff(current_weapon_2));
            add_money(count_win, ".check", 1e3, 2e3);
            document.querySelector(".win__count").textContent = count_win;
        }
    }
    function start_game() {
        config_game.goal = select_first_goal();
        setTimeout((() => {
            play_game();
        }), 500);
    }
    function goal_hero_1() {
        setTimeout((() => {
            moove_hero(".field__heroe-inner_1", 1);
        }), 1e3);
    }
    function goal_hero_2() {
        setTimeout((() => {
            moove_hero(".field__heroe-inner_2", 2);
        }), 1500);
    }
    function goal_enemy_1() {
        setTimeout((() => {
            moove_enemy(".field__evil_1", 1);
        }), 1e3);
    }
    function goal_enemy_2() {
        setTimeout((() => {
            moove_enemy(".field__evil_2", 2);
        }), 1500);
    }
    function select_first_goal() {
        return get_random(1, 3);
    }
    function play_game() {
        if (1 == config_game.goal && config_game.current_life_hero_1 > 0 && config_game.current_life_hero_2 > 0) {
            goal_hero_1();
            goal_hero_2();
            check_damage_heroes();
            config_game.goal = 2;
        } else if (1 == config_game.goal && config_game.current_life_hero_1 <= 0 && config_game.current_life_hero_2 > 0) {
            goal_hero_2();
            check_damage_heroes();
            config_game.goal = 2;
        } else if (1 == config_game.goal && config_game.current_life_hero_1 > 0 && config_game.current_life_hero_2 <= 0) {
            goal_hero_1();
            check_damage_heroes();
            config_game.goal = 2;
        } else if (2 == config_game.goal && config_game.current_life_enemy_1 > 0 && config_game.current_life_enemy_2 > 0) {
            goal_enemy_1();
            goal_enemy_2();
            check_damage_enemys();
            config_game.goal = 1;
        } else if (2 == config_game.goal && config_game.current_life_enemy_1 <= 0 && config_game.current_life_enemy_2 > 0) {
            goal_enemy_2();
            check_damage_enemys();
            config_game.goal = 1;
        } else if (2 == config_game.goal && config_game.current_life_enemy_1 > 0 && config_game.current_life_enemy_2 <= 0) {
            goal_enemy_1();
            check_damage_enemys();
            config_game.goal = 1;
        }
        setTimeout((() => {
            check_game_over();
        }), 3100);
        setTimeout((() => {
            if (config_game.stop_game) return false;
            return play_game();
        }), 5e3);
    }
    function moove_hero(item, num) {
        let arr_1 = [ 1, 3, 5 ];
        let arr_2 = [ 2, 4, 6 ];
        let num_1 = get_random(0, 3);
        let num_2 = get_random(0, 3);
        if (1 == num && !document.querySelector(".field__evil_1").classList.contains("_loose")) {
            document.querySelector(item).classList.add(`_moove-${arr_1[num_1]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_moove-${arr_1[num_1]}`);
            }), 2500);
        } else if (1 == num && document.querySelector(".field__evil_1").classList.contains("_loose")) {
            arr_1 = [ 7, 9, 11 ];
            document.querySelector(item).classList.add(`_moove-${arr_1[num_1]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_moove-${arr_1[num_1]}`);
            }), 2500);
        }
        if (2 == num && !document.querySelector(".field__evil_2").classList.contains("_loose")) {
            document.querySelector(item).classList.add(`_moove-${arr_2[num_2]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_moove-${arr_2[num_2]}`);
            }), 2500);
        } else if (2 == num && document.querySelector(".field__evil_2").classList.contains("_loose")) {
            arr_2 = [ 8, 10, 12 ];
            document.querySelector(item).classList.add(`_moove-${arr_2[num_2]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_moove-${arr_2[num_2]}`);
            }), 2500);
        }
    }
    function moove_enemy(item, num) {
        let arr_1 = [ 1, 3, 5 ];
        let arr_2 = [ 2, 4, 6 ];
        let num_1 = get_random(0, 3);
        let num_2 = get_random(0, 3);
        if (1 == num && !document.querySelector(".field__heroe-inner_1").classList.contains("_loose")) {
            document.querySelector(item).classList.add(`_enemy-${arr_1[num_1]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_enemy-${arr_1[num_1]}`);
            }), 2500);
        } else if (1 == num && document.querySelector(".field__heroe-inner_1").classList.contains("_loose")) {
            arr_1 = [ 7, 9, 11 ];
            document.querySelector(item).classList.add(`_enemy-${arr_1[num_1]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_enemy-${arr_1[num_1]}`);
            }), 2500);
        }
        if (2 == num && !document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            document.querySelector(item).classList.add(`_enemy-${arr_2[num_2]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_enemy-${arr_2[num_2]}`);
            }), 2500);
        } else if (2 == num && document.querySelector(".field__heroe-inner_2").classList.contains("_loose")) {
            arr_2 = [ 8, 10, 12 ];
            document.querySelector(item).classList.add(`_enemy-${arr_2[num_2]}`);
            setTimeout((() => {
                document.querySelector(item).classList.remove(`_enemy-${arr_2[num_2]}`);
            }), 2500);
        }
    }
    if (document.querySelector(".main") || document.querySelector(".team") || document.querySelector(".shop")) {
        const audio_main = new Audio;
        audio_main.preload = "auto";
        audio_main.src = "files/audio_m_1.mp3";
        audio_main.loop = [ true ];
        audio_main.volume = .5;
        document.addEventListener("click", (e => {
            let targetElement = e.target;
            if (targetElement.closest(".volume") && (document.querySelector(".main") || document.querySelector(".shop") || document.querySelector(".team"))) {
                if (targetElement.closest(".volume") && !targetElement.closest(".volume").classList.contains("_hide")) audio_main.volume = 0; else if (targetElement.closest(".volume") && targetElement.closest(".volume").classList.contains("_hide")) {
                    audio_main.volume = .5;
                    audio_main.play();
                }
                targetElement.closest(".volume").classList.toggle("_hide");
            }
        }));
    }
    if (document.querySelector(".game")) {
        const audio_fight = new Audio;
        audio_fight.preload = "auto";
        audio_fight.src = "files/audio_g_2.mp3";
        audio_fight.loop = [ true ];
        audio_fight.volume = .5;
        document.addEventListener("click", (e => {
            let targetElement = e.target;
            if (targetElement.closest(".volume") && document.querySelector(".game")) {
                if (targetElement.closest(".volume") && !targetElement.closest(".volume").classList.contains("_hide")) audio_fight.volume = 0; else if (targetElement.closest(".volume") && targetElement.closest(".volume").classList.contains("_hide")) {
                    audio_fight.volume = .5;
                    audio_fight.play();
                }
                targetElement.closest(".volume").classList.toggle("_hide");
            }
        }));
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let current_level = +sessionStorage.getItem("current-level");
        let current_bet = +sessionStorage.getItem("current-bet");
        let bank = +sessionStorage.getItem("money");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
        }
        if (targetElement.closest(".levels__arrow_left")) if (current_level > 1) {
            sessionStorage.setItem("current-level", current_level - 1);
            document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
        }
        if (targetElement.closest(".levels__arrow_right")) if (current_level < 4) {
            sessionStorage.setItem("current-level", current_level + 1);
            document.querySelector(".levels__middle p").textContent = sessionStorage.getItem("current-level");
        }
        if (targetElement.closest(".levels__arrow-bet_left")) if (current_bet > 50) {
            sessionStorage.setItem("current-bet", current_bet - 50);
            document.querySelector(".levels__middle-bet p").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".levels__arrow-bet_right")) if (bank > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 50);
            document.querySelector(".levels__middle-bet p").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".team__rules-button")) {
            document.querySelector(".team__rules").classList.add("_hide");
            sessionStorage.setItem("team-rule", true);
        }
        if (targetElement.closest(".heroe-team__button")) {
            remove_class_item(".heroe-team__button-box", targetElement.closest(".content-item__heroe").dataset.hero, "_selected");
            remove_class_item(".heroe-team__weapon", targetElement.closest(".content-item__heroe").dataset.hero, "_selected");
            remove_class_item(".heroe-team__weapons", targetElement.closest(".content-item__heroe").dataset.hero, "_selected");
            targetElement.closest(".heroe-team__button-box").classList.add("_selected");
            targetElement.closest(".heroe-team__weapon").classList.add("_selected");
            targetElement.closest(".heroe-team__weapons").classList.add("_selected");
        }
        if (targetElement.closest(".heroe-team__sword")) {
            change_weapon(targetElement.closest(".content-item__heroe").dataset.hero, targetElement.closest(".heroe-team__weapon"), targetElement.closest(".heroe-team__sword"));
            write_bet_info_weapon();
        }
        if (targetElement.closest(".heroe-team__character") && !targetElement.closest(".content-item__heroe").classList.contains("_locked")) {
            let heroe = targetElement.closest(".content-item__heroe").dataset.hero;
            let number_item = targetElement.closest(".content-item__heroe").dataset.hero;
            let weapons = document.querySelectorAll(".heroe-team__weapons");
            weapons.forEach((el => {
                if (!el.classList.contains("_selected") && el.closest(".content-item__heroe").dataset.hero == number_item) {
                    el.closest(".content-item__heroe").classList.add("_anim");
                    setTimeout((() => {
                        el.closest(".content-item__heroe").classList.remove("_anim");
                    }), 1e3);
                } else if (el.classList.contains("_selected") && el.closest(".content-item__heroe").dataset.hero == number_item) {
                    el.classList.remove("_hold");
                    if (targetElement.closest(".content-item__heroe").classList.contains("_active")) {
                        targetElement.closest(".content-item__heroe").classList.remove("_active");
                        if (+sessionStorage.getItem("current-hero-1") == heroe) {
                            sessionStorage.removeItem("current-hero-1");
                            sessionStorage.removeItem("current-weapon-1");
                        } else if (+sessionStorage.getItem("current-hero-2") == heroe) {
                            sessionStorage.removeItem("current-hero-2");
                            sessionStorage.removeItem("current-weapon-2");
                        }
                    } else {
                        el.classList.add("_hold");
                        if (!sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
                            targetElement.closest(".content-item__heroe").classList.add("_active");
                            get_active_weapon(targetElement.closest(".content-item__heroe"));
                        } else if (sessionStorage.getItem("current-hero-1") && !sessionStorage.getItem("current-hero-2")) {
                            targetElement.closest(".content-item__heroe").classList.add("_active");
                            get_active_weapon(targetElement.closest(".content-item__heroe"));
                        } else if (!sessionStorage.getItem("current-hero-1") && sessionStorage.getItem("current-hero-2")) {
                            targetElement.closest(".content-item__heroe").classList.add("_active");
                            get_active_weapon(targetElement.closest(".content-item__heroe"));
                        }
                    }
                }
            }));
            check_select_all_heroes();
        }
        if (targetElement.closest(".store__button_heroes")) {
            remove_class(".store__button", "_active");
            document.querySelector(".item-heroes").classList.remove("_hide");
            document.querySelector(".item-weapons").classList.add("_hide");
            document.querySelector(".store__button_heroes").classList.add("_active");
        }
        if (targetElement.closest(".store__button_weapons")) {
            remove_class(".store__button", "_active");
            document.querySelector(".item-heroes").classList.add("_hide");
            document.querySelector(".item-weapons").classList.remove("_hide");
            document.querySelector(".store__button_weapons").classList.add("_active");
        }
        if (targetElement.closest(".item-heroes__button-box")) {
            let item = +targetElement.closest(".item-heroes__block").dataset.character;
            chek_buy_hero(item);
        }
        if (targetElement.closest(".item-weapons__button-box")) {
            let item = +targetElement.closest(".item-weapons__block").dataset.weapon;
            chek_buy_weapon(item);
        }
        if (targetElement.closest(".header__button-box") && document.querySelector(".team") && sessionStorage.getItem("not-active-weapons")) {
            sessionStorage.removeItem("not-active-weapons");
            save_position_weapons_when_exit();
        }
        if (targetElement.closest(".game__button-start")) {
            document.querySelector(".game__button-start-box").classList.add("_start");
            document.querySelector(".game__button-start").classList.remove("_anim");
            start_game();
            delete_money(+sessionStorage.getItem("current-bet"), ".check");
        }
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();