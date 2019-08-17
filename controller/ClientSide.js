var { Url, TimeCheck } = require('../db/index')
const mongodb = require('mongodb');
var objectId = mongodb.ObjectID;

module.exports = {
    see: function(req, res, next) {
        let iduser = '5d4bdc714f7d0f77e5a9492b';
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
        let iduser = '5d4bdc714f7d0f77e5a9492b';
        try {
            let deleteUr = await Url.deleteOne({ _id: idDel });
        } catch (error) {
            console.log(error)
        }
        console.log(iduser);
        try {
            let deletetime = await TimeCheck.deleteMany({ idUrl: idDel }, { multi: true });
            console.log('dellllll')
        } catch (error) {
            console.log(error)
        }
        res.redirect('/see');
    }
}