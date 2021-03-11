// sử dụng từ khóa super trong js
//  ví dụ tạo class Hero
class Hero {
    // thông tin
    constructor(name, hp, damage) {
        this.name = name;
        this.hp = hp;
        this.damage = damage;
    }

    // chức năng trừ máu khi bị tấn công 
    applyDamage(damage) {
        this.hp = this.hp - damage;
    }

    // chức năng tấng công đối phương
    attack(enemy) {
        enemy.applyDamage(this.damage);
    }
}

//  tạo nhân vật  :
// hero A  , hp : 100 , dmg = 10 
const heroA = new Hero('A', 100, 10);
// hero B  , hp : 100 , dmg = 5 
const heroB = new Hero('B', 100, 5);
// LOG
console.log (heroA , heroB)

// cho A tấn công B
heroA.attack(heroB);
// sau khi tấn công hp B : 90 
console.log(heroA, heroB);


// tạo 1 lớp hero tầm xa 
// kế thừa toàn bộ thuộc tính của hero và thêm thuộc tính tầm xa
class RangeHero extends Hero {
    constructor(name, hp, damage, range) {
        // sử dụng từ khóa super(...) 
        // để không phải viết lại toàn bộ thông tin trong constructor
        super(name, hp, damage);
        // thêm thuộc tính tầm xa
        this.range = range;
    }

    // do rangeHero kế thừa từ hero 
    // => kế thừa chức năng  applyDamage() và attack()
    // vidu : 
    // chúng ta muốn thêm chức năng trong attack + hp 

    // ghi đè :
    attack(enemy) {
        super.attack(enemy);
        // thêm tính năng + hp
        this.hp = this.hp + this.damage;
    };
}

// tạo hero R range 
const heroR = new RangeHero('R', 100, 15 , 10);

//  cho hero R tấn công hero A 
heroR.attack(heroA)

console.log(heroA, heroB , heroR);