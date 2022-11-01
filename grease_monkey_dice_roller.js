// ==UserScript==
// @name     	GreaseMonkey Dice Roller 475445
// @version  	1
// @grant    	none
// @include   http://pododd.com/*
// @include   https://*.amazon.com/*
// @resource	customCSS1 https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/main.css
// @resource	customCSS2 https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/dice.css
// @require		https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/three.min.js
// @require		https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/cannon.min.js
// @require		https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/teal.js
// @require		https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/dice.js
// @require		https://raw.githubusercontent.com/yahavatar/greasemonkey_dice_roller/main/main.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==

window.global_dice_scale = 8;		//Default was 13. 8 gives a good chunks look to the dice but may be too large for a dozen or more dice.

/*
    Code originally comes from: http://www.teall.info/2014/01/online-3d-dice-roller.html
    Also used in FoundryVTT module: Dice So Nice: https://gitlab.com/riccisi/foundryvtt-dice-so-nice


		To-Do List:
    * Make background a little see-through (Opacity?)
    * Figure out how to de-focus the manual input block after typing
    * Figure out how to select dice from the selection of dice and change the input box
    
*/

/*
    <!--<div id="control_panel" style='border:1px solid black;position:absolute;left:10;top:10;' class="control_panel"></div>
		<div id="info_div" style="display: none">
        <div class="center_field">
            <span id="label"></span>
        </div>
        <div class="center_field">
            <div class="bottom_field">
                <span id="labelhelp">click to continue or tap and drag again</span>
            </div>
        </div>
    </div>
    <div id="selector_div" style="display: none; position absolute">
        <div class="center_field">
            <div id="sethelp">
                choose your dice set by clicking the dices or by direct input of notation,<br/>
                tap and drag on free space of screen or hit throw button to roll
            </div>
        </div>
        <div class="center_field">
            <input type="text" id="set" value="4d6"></input><br/>
            <button id="clear">clear</button>
            <button style="margin-left: 0.6em" id="throw">throw</button>
        </div>
    </div>-->
*/

jQuery("body").append(`
		<div id="info_div" style="display: none"></div>
		<div id="selector_div" style="display: none; position absolute"></div>
    <div id="canvas"></div>
		<div id='controls'>
				<input type="text" id="set" value="4d6"></input>
				<button id="throw">throw</button>
				&nbsp;=&nbsp;
				<span id="label"></span>
		</div>
`);

//Scale and Position dice canvas
let canvas = $t.id('canvas');
canvas.style.position = "fixed";
canvas.style.left = (window.innerWidth * .75) + 'px';
canvas.style.top = (window.innerHeight * .75) + 'px';
canvas.style.height = ((window.innerHeight / 4) - 2) + 'px';
canvas.style.width = ((window.innerWidth / 4) - 2) + 'px';
canvas.style.border = "1px solid black";

//Position controls: buttons, input, output
let controls = $t.id('controls');
controls.style.position = "fixed";
controls.style.left = ((window.innerWidth * .75) + 1) + 'px';
controls.style.top = ((window.innerHeight * .75) + 1) + 'px';

//Initialize Dice
dice_initialize(canvas); //"canvas" limits this to the container for the dice. We should not use the entire document.body!!!

