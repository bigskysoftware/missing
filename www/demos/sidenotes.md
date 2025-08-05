---
draft: true
title: Sidenotes
---

Sidenotes are created with the `<small role=note>`{ .language-html } element.
Sidenotes are supplemental notes or comments placed in the margins of a page, typically alongside the main text.
They provide additional information, context, or commentary related to the adjacent text.

Sidenotes must be visually and semantically distinct even when the viewport isn't wide enough to facilitate their normal placement.
This page has a few sidenotes which are implemented using markup similar to the example below.

<figure>
<figcaption><sub-title class=allcaps>Example</sub-title>Sidenotes</figcaption>

~~~ html
<small role=note>
	This is the first sidenote.
	Be default it will appear in the right-hand margin, provided the margin is larger than `--sidenote-width`.
	The default value for `--sidenote-width` is `20ch`.
</small>
<small role=note style="--sidenote-width:40ch;">
	This is the second sidenote.
	On large screens, it appears in the left-hand margin because the XYZ attribute is set.
	Since I wanted to change the width of the sidenote, I set the `--sidenote-width` variable to 40ch.
</small>
~~~

</figure>

What follows now is some <i>lorem ipsum</i> so that we can demonstrate the sidenotes.
You can adjust the viewport width in order to see how the sidenotes will display on mobile screens.

<small role=note>
This is the first sidenote.
Be default it will appear in the right-hand margin, provided the margin is larger than `--sidenote-width`.
The default value for `--sidenote-width` is `20ch`.
</small>

The Dude abides.
That rug really tied the room together, did it not?
This aggression will not stand, man.
Mark it zero!
This is not 'Nam, this is bowling; there are rules.
Careful, man, there's a beverage here.
That's just, like, your opinion, man.

<small role=note class="float:left" style="--sidenote-width: 40ch;">
This is the second sidenote.
On large screens, it appears in the left-hand margin because it has the <code>.float:left</code> class.
Since I wanted to change the width of the sidenote, I set the <code>--sidenote-width</code> variable to 40ch.
</small>

My thinking about this case, which has been, like, a lot of ins and outs, a lot of what-have-yous.
The bums will always lose.
Obviously you're not a golfer.
You human paraquat!
Am I wrong? Am I wrong?
Over the line!
Donny, you're out of your element!
You want a toe? I can get you a toe, believe me. There are ways, Dude.
You don't have to do that, you know.
I had a rough night and I hate the Eagles.
What in God's name are you blathering about?

I am the Walrus.
Or was it, Karl Hungus?
A lot of strands in ol' Duder's head.
Don't be fatuous, Jeffrey.
Strong men also cry. Strong men also cry.
Yes, but I was talking about the Dude.
We're talking about unchecked aggression here.
Has the whole world gone crazy?

You're out of your element, Donnie.
Well, that's just, like, your opinion, man.
Is this your homework, Larry?
Wave of the future, Dude.
One hundred percent electronic.
Stay out of Malibu, deadbeat!
Look, man, I've got a date.
Yeah, well, you know, the Dude abides.
