namespace SpriteKind {
    export const tiroinimigo = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 5 . . . . . . . 
        . . . . . . . 1 5 . . . . . . . 
        . . . . . . . 2 5 . . . . . . . 
        . . . . . . . 5 2 . . . . . . . 
        . . . . . . . 5 1 . . . . . . . 
        . . . . . . . 5 2 . . . . . . . 
        . . . . . . . 1 5 . . . . . . . 
        . . . . . . . 2 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, Nave, 0, -50)
    pause(500)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo())
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.tiroinimigo, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tiroinimigo, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 100)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 500)
    sprites.destroy(otherSprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += 0.5
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 100)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
let vidainimiga: StatusBarSprite = null
let localização = 0
let naveinimiga: Sprite = null
let Tiro: Sprite = null
let projectile: Sprite = null
let Nave: Sprite = null
game.showLongText("Aperte espaço para atirar", DialogLayout.Bottom)
effects.confetti.startScreenEffect()
Nave = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . . . . . 3 3 3 . . . . . . . 
    . . . . . . 3 3 3 . . . . . . . 
    . . . . . 3 . 3 . 3 . . . . . . 
    . . . . 3 . . 3 . . 3 . . . . . 
    . . . . 3 . . 3 . . 3 . . . . . 
    . . . 3 . . . 3 . . . 3 . . . . 
    . . . 3 3 3 3 3 3 3 3 3 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Nave)
Nave.setStayInScreen(true)
info.setScore(0)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        Tiro = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 2 1 2 . . . . . . 
            . . . . . . . 3 1 3 . . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . 2 1 1 1 2 . . . . . 
            . . . . . . 2 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 3 1 1 1 3 . . . . . 
            . . . . . . 2 3 1 3 2 . . . . . 
            . . . . . . . 2 2 2 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.tiroinimigo)
        Tiro.setPosition(value, value)
        Tiro.setVelocity(0, 40)
    }
})
game.onUpdateInterval(1500, function () {
    naveinimiga = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fdd111111ddf......
        ......fbdd1111dddf......
        ......fcdbfddfbdbf......
        .......fbcf11fcbfff.....
        .......ffb1111bcfbcf....
        ........fcdb1bdfbbbf....
        .......ffffffffffcf.....
        .....fcb1bcfffff........
        .....f1b1b1ffff.........
        ......ffbff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    localização = randint(0, scene.screenWidth())
    vidainimiga = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    vidainimiga.attachToSprite(naveinimiga, 5, 0)
    naveinimiga.setPosition(localização, 0)
    naveinimiga.setVelocity(0, 20)
    Tiro = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . 2 1 1 1 2 . . . . . 
        . . . . . . 2 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.tiroinimigo)
    Tiro.setPosition(localização, 0)
    Tiro.setVelocity(0, 40)
})
