'use strict';

let Candlestick = require('../../dict/candlestick')

module.exports = class CandlestickRepository {
    constructor(db) {
        this.db = db
    }

    getLookbacksForPair(exchange, symbol, period) {
        return new Promise((resolve) => {
            let sql = 'SELECT * from candlesticks where exchange = ? AND symbol = ? and period = ? order by time DESC LIMIT 750'

            this.db.all(sql, [exchange, symbol, period], (err, rows) => {
                if (err) {
                    console.log(err);
                    return resolve();
                }

                resolve(rows.map((row) => {
                    return new Candlestick(row.time, row.open, row.high, row.low, row.close, row.volume)
                }))
            })
        })
    }
}
