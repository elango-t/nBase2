# HTML 
## Day1

1. linking css to html <link href="" rel="stylesheet"/>
2. ### Selector
   * ```<p>``` element selector,
   * #id selector ,
   * .class selector ,
   * :pseudo class selector.

3. content --  padding --  border-- margin
4. margin ``` topbottom left right```
5. padding ```top right bottom left```
6. border  ``` size color```
7. text shadow ``` right bottom blur color```
8. ```<body>``` block element(respected by other element)
9. #### ```<script src="" ></script>```
10. comments ```<!--      -->```
11. ## favicon 
    * ```<link rel="icon" href="" type="image//icon">```
    * it is a metadata
12.  ## Semantic HTML
    * Header -same throughout the webpage ```<header>```
    * navigation bar -should be seperate conponente ```<nav>```
    * main content ```<main>,<article>,<section>,<div>``` 
    * side bar ```<aside>```
    * footer ```<foorter>```
13. ```<main>``` should be unique per page ,no nesting is allowed 
14. ```<article>``` has own sence 
15. ## Non semantic mapping
    * ```<span>,<div>``` used when no proper semantic tag is available
16. ```<blockquote>,<q>``` creates a bock or quotes the large amount of content taken from other sources ,cite is used to provide the link of that website
17. ```<abbr>``` used to wrap abbreviations
18. ```<address>``` used to wrap addresses
19. ```<sub>,<sup>``` used for super and subscript
20. ```<time>``` datetime
21. ```<code>``` used to denote computer code

# Day 2
1. Absolute url - points to the exact location ,contains protoclols exact
2. Relative url - points to the location relative to the current file
3. Document fragments -points to a specific part in a file 
4. mailto -used along with ```<a>``` to redirect to mail
## image
5. image -important to declare width and height because browser loads the html first and the image or video next .As soon as the html is loaded, the browser displays it,leaving no space for the image.when the image is loaded the text moves away ,which creates a distraction to the users who already started reading it.
## video
6. video -should have "controls" type src loop muted  poster-thumbnail
## table
7. table -scope="col" used to tell the screen readers that the heading is the col heading 
8. colspan-merges columns
9. rowsapn -merges rows
## forms
10. ```<button> or <input> ``` value set to submit or button
11. ```<form>``` action defines what to happen when submit button is clicked,method defines the method need to be used for transmission
12. ```<input>``` name -gives name for the element ,required -boolean attribute
13. for in label should match with the id in input which are related to each other
14. ```button``` type=reset,button,submit
15.  ```<select>``` used for dropdown select option value="option name" option name option




# CSS
1.    * internal stylesheets
      * External stylesheets
      * in line style
    
2. h1+p selector works when a h1 taga and a para comes next to next
3. Attribute selector selects the elements based on its attribure value (EG:a:visited)

## Day 3
1. calc() function is used to do simple calculation s inside the css file
2. transform :rotate(0.8 turn)
3. class selectors -class =warning mild (class stacking) -accessed as .warning.mild
4. id unique per page 
5. Attribute seletor -a[src] targets the attribute value 
6. pseudoclass selectors -styles based on action and condition
7. combinators 
    * descendent combinator - seperated by space - second selector is chosed if its parent is first selector
    * child selector - seperated by > - only the direct children of the first selector is chosed if it is the second selector
    * next-sibling selector - elements which are immediate child to the first selector is chosed 
    * subsequent-sibling selector -no need of immediate occurence
## Box model -relation between different boxes in the page
## Outer display types
8. # block 
    * new line
    * the widht and height properties of it are respected
    * it pushes away all the other elements away 
    *if width is not specified it takes max-width 100%
9. # Inline
    * no new line
    * widht and height properties do not apply
    * it pushes other inline element to bepushed away form it 

## Inner display elements
10. display:flex makes the content inside the box inline   
11. display :block makes the content inside the box block .
12. display :inline:block -no new line but width and height are respected
## conflicting rules
13. the rules defined at the last is used



## Day 12
1.    * font -weight:bold -sets bold text
2.    * text-transform:capitalize
3.    * text-align:justify -aligns the text 
4.    * text-shadow: 4px 4px 5px red -horixontal-vertical-blur-color
5.    * line-height:sets the gap between lines
6.    * letter-spacing ,word-spacing -brings gap between letters and words
7.    * font-size:sets the size of the font
8.    * font-family:sets the font family
9.    * font-style:italic -sets the font style





