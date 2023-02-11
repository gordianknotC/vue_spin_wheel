# Vue SpinningWheel
[Demo](https://gordianknotc.github.io/vue_spin_wheel)



## Drawing Sector

__properties__:
- text
- background-color
- border-thickness
- sectorAngleInDegree - sector大小（度）
- initialQuadrant - 初始象限
- diameter - sector 直徑
- font-Color
### Examples
```vue
<template lang="pug">
Sector(
    text="45'-4 quadrant"
    background-color="blue"
    :border-thickness="0"
    :sectorAngleInDegree="45"
    :initialQuadrant="4"
    :diameter="280"
    font-color="black"
)
</template>
```

![](.README_images/98f360e7.png)

```vue
<template lang="pug">
Sector(
    text="60'-4 quadrant"
    background-color="orange"
    :border-thickness="0"
    :sectorAngleInDegree="60"
    :initialQuadrant="4"
    :diameter="280"
)
</template>
```
![](.README_images/18ff1f2d.png)


```vue
<template lang="pug">
Sector(
    text="45'-1 quadrant"
    background-color="blue"
    :border-thickness="0"
    :sectorAngleInDegree="45"
    :initialQuadrant="1"
    :diameter="280"
)
</template>
```

![](.README_images/5c685255.png)


```vue
<template lang="pug">
Sector(
    text="60'-2 quadrant"
    background-color="orange"
    :border-thickness="0"
    :sectorAngleInDegree="60"
    :initialQuadrant="2"
    :diameter="280"
)
</template>
```
![](.README_images/29c01b49.png)




```vue
<template lang="pug">
section
  .container.relative(ref="sectorContainer")
    .sector(ref="sector")
      .sector__before
      .sector__content {{text}}
      .sector__after

</template>
```

### Sector 組成
|  container   | before  |  content |
|  ----        | ----    |  ----    |
| ![](.README_images/3d6f823d.png)  | ![](.README_images/c192f4c7.png) | ![](.README_images/5be79b72.png) |




## Drawing SpinningWheel

![](.README_images/6f43e639.png)
