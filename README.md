# Who Sings

## Running the project
Install dependencies and start the application.
```sh
yarn install
yarn pod:install
yarn ios # or yarn android
```

## Design patterns
The _backend_ of the application is organized taking inspiration from the DDD (Domain Driven Design) pattern and Clean architecture.
Allowing us to easily test and mock all of our services and repositories, define clear data models and potentially scale and expand the application.
All the relevant files can be found in the `/src/core` folder.

On the other hand, the _frontend_ (Screens/ReactNative) of the application uses some kind of MVP (Model View Presenter) pattern. The presenter, in our case, has the job of instantiating all the needed services and relevant dependencies and control the behaviour of the View (Screen).
Creating clean and understandable Screens with little to none logic.
