var { Url, TimeCheck } = require('../db/index')
const mongodb = require('mongodb');
var objectId = mongodb.ObjectID;

module.exports = {
    see: function(req, res, next) {
        let iduser = req.session.passport.user;
        Url.find({ idUser: iduser }).then((dulieu) => {
            res.render('see', { title: 'Express', data: dulieu });
        }).catch((e) => {
            res.status(500).send()
        })
    },
    showIndex: function(req, res, next) {
        res.redirect('/login')
    },
    deleteDomain: async function(req, res, next) {
        let idDel = objectId(req.params.idDel);
        let urlDel = req.params.urlDel;
        try {
            let deleteUr = await ur.deleteOne({ _id: idDel });
        } catch (error) {
            console.log(error)
        }
        //xu ly
        try {
            let deletetime = await TimeCheck.deleteMany({ getUrl: urlDel }, { multi: true });
        } catch (error) {
            console.log(error)
        }
        res.redirect('/see');
    }
}