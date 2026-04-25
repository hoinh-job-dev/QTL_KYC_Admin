var config = global.config;

module.exports = {

    isMasterAdmin: function (req, res, next) {
        var role = req.user.role;
        if (!role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role === config.privilege.master_admin) {
            return next();
        }
        return res.send({ state: 'error', error: global.property.get('error_110') });
    },

    isSystemAdmin: function (req, res, next) {
        var role = req.user.role;
        if (!role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role === config.privilege.system_admin) {
            return next();
        }
        return res.send({ state: 'error', error: global.property.get('error_110') });
    },

    isOperatorAdmin: function (req, res, next) {
        var role = req.user.role;
        if (!role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role === config.privilege.operator_admin) {
            return next();
        }
        return res.send({ state: 'error', error: global.property.get('error_110') });
    },

    isMasterOrSystemAdmin: function (req, res, next) {
        var role = req.user.role;
        if (!role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role === config.privilege.master_admin || role === config.privilege.system_admin) {
            return next();
        }

        return res.send({ state: 'error', error: global.property.get('error_110') });
    },

    isMasterOrOperatorAdmin: function (req, res, next) {
        var role = req.user.role;
        if (!role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role === config.privilege.master_admin || role === config.privilege.operator_admin) {
            return next();
        }
        return res.send({ state: 'error', error: global.property.get('error_110') });
    },

    isSystemOrOperatorAdmin: function (req, res, next) {
        var role = req.user.role;
        if (!role) {
            return res.send({ state: 'error', error: global.property.get('error_106') });
        }
        if (role === config.privilege.system_admin || role === config.privilege.operator_admin) {
            return next();
        }
        return res.send({ state: 'error', error: global.property.get('error_110') });
    }
    
}