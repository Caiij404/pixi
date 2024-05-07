<template>
  <div>
  </div>
</template>

<script setup lang="ts">

import { SectionEditorUI } from "./SectionEditorUI";
SectionEditorUI.get();

// import * as PIXI from 'pixi.js'
// import { PixiGraphics } from './PixiGraphics';
// let app = new PIXI.Application({
// 	antialias: true,
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// 	backgroundColor: 0xffffff,
// })
// document.body.appendChild(app.view as any);

// let sprite = new PIXI.Sprite(PIXI.Texture.from('./line.jpg'));
// // sprite.scale.set(0.1,0.2);
// sprite.width = 31;
// sprite.height = 76;
// sprite.position.set(0,0);
// sprite.eventMode = 'static';
// // sprite.anchor.set(0.5);
// // sprite.interactive = true;
// sprite.zIndex = 3

// // dashZone
// let style = {
// 	width: 2,
// 	color: 0xff5436,
// 	alpha: 0.6,
// }
// let dashZone = PixiGraphics.get().drawDashRectangle(100,100,400,400,style);
// app.stage.addChild(dashZone as any);

// let spriteDashBox = PixiGraphics.get().drawDashRectangle(0,0,31,76,style);
// spriteDashBox.zIndex = 2

// let container = new PIXI.Container();
// container.sortableChildren = true;
// container.addChild(sprite as any);
// container.addChild(spriteDashBox as any);
// app.stage.addChild(container as any);

// let minx = 100;
// let maxx = 500;
// let miny = 100;
// let maxy = 500;

// let globalMouseMove = (e: any) => {
// 	let mouseX = e.data.global.x;
// 	let mouseY = e.data.global.y;
// 	if(mouseX < minx){
// 		mouseX = minx;
// 	}
// 	if(mouseX > maxx - container.width){
// 		mouseX = maxx - container.width;
// 	} 
		
// 	if(mouseY < miny) {
// 		mouseY = miny;
// 	}
// 	if(mouseY > maxy - container.height){
// 		mouseY = maxy - container.height;
// 	} 
// 	container.position.set(mouseX, mouseY);
// }

// let pointerDown = () => {
// 	container.addEventListener('globalmousemove',globalMouseMove);
// 	console.log('down');
// }

// let pointerUp = ()=>{
// 	container.removeEventListener('globalmousemove',globalMouseMove);
// 	console.log('up')
// }

// // container.pivot.set(container.width / 2, container.height / 2)
// container.eventMode = 'static'
// container.on('pointerdown',pointerDown).on('pointerup',pointerUp).on('pointerupoutside',pointerUp);
// container.position.set(100,100)



// window.addEventListener('keydown',(e)=>{
// 	if(e.key == '3')
// 	{
// 		// spriteDashBox.alpha = 0.3
// 		spriteDashBox.line.color = 0xff0000;
// 	}
// 	else if(e.key == '4')
// 	{
// 		// spriteDashBox.alpha = 1;
// 		spriteDashBox.line.color = 0x00ff00;
// 	}
// 	console.log(container.width, '   ', container.height);
// })


// 禁止右键菜单
document.addEventListener('contextmenu',(e)=>{
	e.preventDefault();
})
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

canvas {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
}
</style>
