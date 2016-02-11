# huefuse
A color-matching game for the modern web

![Preview1](http://i.imgur.com/hsOQcQz.png)
![Preview2](http://i.imgur.com/DOpHlbM.png)

## Mechanics

The user is given a color made by randomly generated RGB values. The user will then try to match
the given color as closely as they can, by mixing the colors red, green, and blue.

In Endless mode, the user is given 20 seconds to come up with a color.

In Arcade mode, the user is initially given 20 seconds, which decreases by 0.2 seconds each level
until all that's given to the user is 3 seconds.

Points are awarded based on color accuracy.

## Controls

- **Left arrow key** for increasing the amount of red. When red is already maxed out, pressing this key
decreases the amount of red instead
- **Down arrow key** for increasing the amount of green. When green is already maxed out, pressing this key
decreases the amount of green instead
- **Right arrow key** for increasing the amount of blue. When blue is already maxed out, pressing this key decreases the amount of blue instead
- **Space** for checking your answer
- **Esc** to pause/unpause

## To-do

- [x] Background music
- [ ] Use a paused screen
- [ ] Unpause 3 seconds after hitting Esc
- [ ] High scores

## Contributing

This source code is under the MIT License.

The music used in the game are not for download. If you like the music, support the artists by buying their music.

The code is (adequately) decorated with comments, so feel free to look at and improve on the code!
