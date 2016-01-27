### project file system structure

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

**TODO:** structure bin/ directory

| directory     | description                                                |
|---------------|------------------------------------------------------------|
| bin/          | code base dir                                              |
| etc/          | configuration                                              |
| doc/          | documentation                                              |