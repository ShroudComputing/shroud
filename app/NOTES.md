## File structure

### project file system structure

Inspired by the unix file system structure

| directory     | description                                                |
|---------------|------------------------------------------------------------|
| app/          | root app directory, should not be accessed by normal users |
| app/bin       | app code                                                   |
| app/doc       | documentation                                              |
| app/etc       | configuration files                                        |
| app/lib       | core [components](#component)                              |
| app/opt       | user installable [components](#component)                  |
| app/run       | run-time variable data, cleared between reboots            |
| app/srv       | served files like templates                                |
| app/tmp       | temporary files, cleared between reboots                   |
| app/var       | variable files, persistent between reboots                 |
| app/var/cache | cache files                                                |
| app/var/log   | log files                                                  |
| bin/          | command line utilities                                     |
| log/          | symlink to app/var/log                                     |

### <a name="component"></a>component file system structure

**TODO:** re-structure bin/ directory

| directory      | description                                         |
|----------------|-----------------------------------------------------|
| bin/           | code base dir                                       |
| bin/controller | handles user input to manipulate data               |
| bin/helper     | utility functions                                   |
| bin/model      | data models, loaded by files in bin/res             |
| bin/res        | database manipulation                               |
| bin/route      | routing for express and angular (->move to config?) |
| bin/service    | combines above methods to provide to components ?!  |
| etc/           | configuration                                       |
| doc/           | documentation                                       |
| srv/           | files that are served to the user                   |
| srv/css        | css files                                           |
| srv/html       | html files                                          |
| srv/img        | image files                                         |
| srv/js         | js files                                            |
| srv/less       | less files                                          |

## Code patterns

##### Singleton

    const internals = {};

    internals.Singleton = function() {

    };

    internals.Singleton.prototype.fn = function() {

    };

    module.exports = exports = new internals.Singleton();

##### Class

    const internals = {};

    internals.Class = function() {

    };

    internals.Class.prototype.fn = function() {

    };

    module.exports = exports = internals.Class;

##### Functions

    const internals = {};

    internals.fn = function() {

    };

    internals.fn2 = function() {

    };

    module.exports = exports = internals;

## Dependency Injection

* split at ':'
* name[0] => component
* name[1] => type (helper, controller, ...)
* join name[2...n] with ':' => module name
