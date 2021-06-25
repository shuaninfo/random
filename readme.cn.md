# random

> 生成一个[强加密](https://en.wikipedia.org/wiki/Strong_cryptography) 的随机字符串

Can be useful for creating an identifier, slug, salt, PIN code, fixture, etc.

用于创建：标识、slug、salt、PIN code 、fixture等

## 安装包

```shell
$ npm install @shuaninfo/random -S
# 或
$ yarn add @shuaninfo/random
```

## 使用方法

```js
import random from '@shuaninfo/random';

random({length: 10});
//=> '2cf05d94db'

random({length: 10, type: 'base64'});
//=> 'YMiMbaQl6I'

random({length: 10, type: 'url-safe'});
//=> 'YN-tqc8pOw'

random({length: 10, type: 'numeric'});
//=> '8314659141'

random({length: 6, type: 'distinguishable'});
//=> 'CDEHKM'

random({length: 10, type: 'ascii-printable'});
//=> '`#Rt8$IK>B'

random({length: 10, type: 'alphanumeric'});
//=> 'DMuKL8YtE7'

random({length: 10, characters: 'abc'});
//=> 'abaaccabac'
```

## API

### random(options)

返回一个随机字符串， 默认值： [Hex](https://en.wikipedia.org/wiki/Hexadecimal) 

### random.async(options)

返回一个Promise<string>，默认值： [Hex](https://en.wikipedia.org/wiki/Hexadecimal) 

对于多数用例来说，并不需要异步方法，在nodejs文档中

> The `crypto.randomBytes()` method will not complete until there is sufficient entropy available. This should normally never take longer than a few milliseconds. The only time when generating the random bytes may conceivably block for a longer period of time is right after boot, when the whole system is still low on entropy.

通常任何异步都会有额外的开销



#### options

类型: `object`

##### length

*Required*

类型: `number`

字符串的长度

##### type

类型: `string`
默认: `'hex'`
值: `'hex' | 'base64' | 'url-safe' | 'numeric' | 'distinguishable' | 'ascii-printable' | 'alphanumeric'`

使用预定义集合中的字符

不能与`type`同时使用

The `distinguishable` set contains only uppercase characters that are not easily confused: `CDEHKMPRTUWXY012458`. It can be useful if you need to print out a short string that you'd like users to read and type back in with minimal errors. For example, reading a code off of a screen that needs to be typed into a phone to connect two devices.

The `ascii-printable` set contains all [printable ASCII characters](https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters): ``!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~`` Useful for generating passwords where all possible ASCII characters should be used.

 `alphanumeric` 集合包含大写字母、小写字母和数字：

`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`. 用于生成 [nonce](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/nonce) 值

##### characters

Type: `string`
Min length: `1`
Max length: `65536`

使用预定义集合中的字符

不能与`type`同时使用



## 相关项目

- [random-int](https://github.com/sindresorhus/random-int) - Generate a random integer
- [random-float](https://github.com/sindresorhus/random-float) - Generate a random float
- [random-item](https://github.com/sindresorhus/random-item) - Get a random item from an array
- [random-boolean](https://github.com/arthurvr/random-boolean) - Get a random boolean
- [random-obj-key](https://github.com/sindresorhus/random-obj-key) - Get a random key from an object
- [random-obj-prop](https://github.com/sindresorhus/random-obj-prop) - Get a random property from an object
- [unique-random](https://github.com/sindresorhus/unique-random) - Generate random numbers that are consecutively unique