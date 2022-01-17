const belvo = require('belvo').default
const moment = require('moment')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAync')

let client

const development = new belvo(
    process.env.BELVO_SECRET_ID_DEV,
    process.env.BELVO_SECRET_PASSWORD_DEV,
    'development'
)

const sandbox = new belvo(
    process.env.BELVO_SECRET_ID_SANDBOX,
    process.env.BELVO_SECRET_PASSWORD_SANDBOX,
    'sandbox'
)

const widget = {
    branding: {
        company_name: "Solutions Engineer Challenge",
    }
}
const options = { scopes: 'read_institutions,write_links,read_links', widget: widget }

exports.belvoToken = (req, res) => {
    const { environment } = req.params

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(function () {
            client.widgetToken.create(options)
                .then((response) => {
                    res.json(response)
                })
                .catch((error) => {
                    res.status(500).send({
                        message: error.message
                    })
                })
        })
}

exports.updateLink = (req, res) => {

    const { link_id, environment } = req.body

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(function () {
            client.widgetToken.create({ link: link_id })
                .then((response) => {
                    res.json(response);
                })
                .catch((error) => {
                    res.status(500).send({
                        message: error.message
                    });
                });
        });
}

exports.getAccounts = (req, res) => {
    const { link_id, environment } = req.body

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(() => {
            client.accounts.retrieve(link_id)
                .then((response) => {
                    res.json(response)
                })
                .catch(function (error) {
                    res.status(500).send({
                        message: error.message
                    })
                })
        })
}

exports.getTransactions = (req, res) => {
    const { link_id, environment } = req.body
    const date_from = moment().subtract(30, "days").format('YYYY-MM-DD')
    const date_to = moment().format('YYYY-MM-DD')

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(function () {
            client.transactions.retrieve(link_id, date_from, { dateTo: date_to })
                .then((response) => {
                    res.json(response)
                })
                .catch((error) => {
                    console.log('error', error)
                    res.status(500).send({
                        message: error.message
                    })
                })
        })
}

exports.getBalances = (req, res) => {
    const { link_id, environment } = req.body
    const date_from = moment().subtract(30, "days").format('YYYY-MM-DD')
    const date_to = moment().format('YYYY-MM-DD')

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(function () {
            client.balances.retrieve(link_id, date_from, { dateTo: date_to })
                .then((response) => {
                    res.json(response);
                })
                .catch((error) => {
                    console.log('error', error)
                    res.status(500).send({
                        message: error.message
                    });
                });
        });
}

exports.getOwners = (req, res) => {
    const { link_id, environment } = req.body

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(function () {
            client.owners.retrieve(link_id)
                .then((response) => {
                    res.json(response)
                })
                .catch((error) => {
                    console.log('error', error)
                    res.status(500).send({
                        message: error.message
                    })
                })
        })
}

exports.deleteLink = catchAsync(async (req, res) => {
    const { link_id, user_id, environment } = req.body

    await User.findByIdAndDelete(user_id)

    if (environment === "development") {
        client = development
    } else {
        client = sandbox
    }

    client.connect()
        .then(function () {
            client.links.delete(link_id)
                .then((response) => {
                    res.json(response)
                })
                .catch((error) => {
                    console.log('error', error)
                    res.status(500).send({
                        message: error.message
                    })
                })
        })
})

