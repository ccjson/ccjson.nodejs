
exports.forLib = function (LIB) {

    return LIB.Promise.resolve({
        forConfig: function (defaultConfig) {

            var Entity = function (instanceConfig) {
                var self = this;
                var config = {};
                LIB._.merge(config, defaultConfig)
                LIB._.merge(config, instanceConfig)

                self.toString = function () {
                    var obj = {};
                    LIB._.merge(obj, LIB._.cloneDeep(self.__proto__));
                    LIB._.merge(obj, LIB._.cloneDeep({
                        config: instanceConfig
                    }));
                    return obj;
                }

                self.AspectInstance = function (aspectConfig) {
                    return LIB.Promise.resolve({
                        decrypt: function () {
                            var json = LIB.CJSON.stringify(aspectConfig);
                            json = json.replace(new RegExp("\\(EncryptedUsing:" + config.secret + "\\)", "g"), "");
                            aspectConfig = JSON.parse(json);
                            return LIB.Promise.resolve(aspectConfig);
                        }
                    });
                }
            }
            Entity.prototype._entity = "07-InstanceAspects/profile";
            Entity.prototype.config = defaultConfig;

            return Entity;
        }
    });
}
