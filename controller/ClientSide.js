var { Url, TimeCheck } = require('../db/index')
const mongodb = require('mongodb');
var objectId = mongodb.ObjectID;

module.exports = {
    see: function(req, res, next) {
        let iduser = '5d4bdc714f7d0f77e5a9492b';
        Url.find({ idUser: iduser, hidden: false }).then((dulieu) => {
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
            let deleteUr = await Url.findByIdAndUpdate({ _id: idDel }, {
                $set: { hidden: true }
            });
        } catch (error) {
            console.log(error)
        }
        console.log(iduser);
        // try {
        //     let deletetime = await TimeCheck.deleteMany({ idUrl: idDel }, { multi: true });
        //     console.log('dellllll')
        // } catch (error) {
        //     console.log(error)
        // }
        res.redirect('/see');
    },
    showHiddenWeb: async(req, res, next) => {
        let iduser = '5d4bdc714f7d0f77e5a9492b';
        Url.find({ idUser: iduser, hidden: true }).then((dulieu) => {
            res.render('hiddenWeb', { title: 'Hidden Web', data: dulieu });
        }).catch((e) => {
            res.status(500).send()
        })
    },
    restoreDomain: async(req, res, next) => {
        let idRes = objectId(req.params.idRes);
        let iduser = '5d4bdc714f7d0f77e5a9492b';
        try {
            let deleteUr = await Url.findByIdAndUpdate({ _id: idRes }, {
                $set: { hidden: false }
            });
        } catch (error) {
            console.log(error)
        }
        res.redirect('/hiddenWeb');
    }
}