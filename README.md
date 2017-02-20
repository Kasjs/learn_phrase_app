# [Learn_phrase_app](https://phrase-generator.herokuapp.com)

### Welcome to learn_phrase_app, application created for learning and improving English skills.
You can learn new world or phrases, add category, add items in category, remove category, rename category, remove items, add new items.
This application work in offline and online mode.
![Dashboard](https://drive.google.com/file/d/0B74hhWi3aRfJOUtXTjVZQlZWSmc/view/dashboard.png)
For use this app please follow to [phrase-generator](https://phrase-generator.herokuapp.com).
For contributing or investigation this app do next:
### Code coverage(Mocha, Chai, Enzyme): 44% [show coverage](http://www.awesomescreenshot.com/image/2192875/de678037e2eb41e3908be6d9ad7a0c72)
* **Download or clone repository**
* **Then open command line and type:** npm install
* **After that type in command line:** npm run dev
* **Finally go to browser and type:** localhost:3000

### Structure of application
```
+---config
|   
+---dist
|    +---appcache
|
+---public                                // Client side
|   +---app
|   |    +---src
|   |    |    +---actions
|   |    |    +---ajaxCalls
|   |    |    +---components
|   |    |        \---pageSubComponents
|   |    |    +---constants
|   |    |    +---containers
|   |    |    +---localStorage
|   |    |    +---reducers
|   |    \---styles
|   |    |    +---css
|   |    |        +---style.lib.css           
|   |    |   \---less
+---server                                 // Server side                          
|   +---assets
|   +---controllers
|   +---middlewares
|   +---models
|   +---passport
|   \---routes
\---test
```
