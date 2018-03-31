# Architecture

The main concepts used to develop this react-native app are the following:

- redux <br>
App-wide store to manage state, it's a well established library, with lots of documentation and best practices.

- redux-saga <br>
Middleware to orchestrate the flow of the application. Sagas are like micro-services, sitting idle waiting for an event, to then produce side effects, redirect app flow and a lot more.

- redux-persist <br>
Very simple and performant local storage solution. By using it, you can simply forget about dealing with AsyncStorage directly (and in many cases, with any ad-hoc sqlite solution).

- react-native-style-tachyons <br>
This is the react-native version of the web tachyons library. Instead of having styles in a central location separate from the actual code, you get very fluid and functional styling by composing small, discrete mini-styles.

- react-navigation <br>
The de-facto standard for react-native navigation. Wix's react-native-navigation is fully native, but it's being rewritten, so it's not exactly stable.

- react-native-maps <br>
The standard to implement Google Maps.

- color palette <br>
By defining a small set of colors, graphic designers can completely change the look and feel of the app. Additionally, this enables powerful transitions such as changing color themes on the fly (not implemented in this project)

# DX
The project uses 

- flow
- eslint
- prettier
- yarn
- jest
- vscode

# Misc code

-    https://medium.com/@justintulk/debouncing-reacts-controlled-textareas-w-redux-lodash-4383084ca090 <br>
Adapted the code to debounce user input in the Search screen. Mainly to speed through lodash.debounce characteristics

- https://stackoverflow.com/questions/34401098/remove-a-property-in-an-object-immutably <br>
An elegant solution to remove a key from an object

# Extra Features

- Allow users to choose the unit to display temperature (either Celsius or Fahrenheit). This is persisted to local storage.
- Display the local time for any selected city. This is refreshed each time the detail screen (City) is entered and whenever the user refreshes the data (pull down)

# Issues

- Swipe to Delete button flashes when a choosing a city in the main screen <br>
It's documented in https://github.com/jemise111/react-native-swipe-list-view/issues/182, but none of the workarounds worked in this case

- ~~Multiple warnings about react lifecycle hooks being deprecated~~ <br>
~~The app was initially running RN 0.54.3, but due to an incompatibility with react-native-maps, it was downgraded to 0.54.0-rc3. This version reports these warnings, which were later removed when 0.54.0 went stable.~~ <br>
This was solved by upgrading RN to 0.54.3 and react-native-maps to a very recent master (plus some configuration changes on the android side)







    