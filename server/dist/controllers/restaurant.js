"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getRestaurant = exports.getRestaurants = void 0;
var data_1 = __importDefault(require("../database/data"));
var getRestaurants = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, data_1.default.query('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(Avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id')];
            case 1:
                results = _a.sent();
                // console.log(results);
                console.log('reached1');
                res.status(200).json({
                    status: 'success',
                    results: results.rows.length,
                    data: {
                        restaurants: results.rows
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRestaurants = getRestaurants;
var getRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant, reviews, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('reached');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, data_1.default.query('SELECT * FROM restaurants left join (select restaurant_id, COUNT(*), TRUNC(Avg(rating), 1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1', [req.params.id])];
            case 2:
                restaurant = _a.sent();
                if (restaurant.rows.length < 1) {
                    return [2 /*return*/, res.status(404).json({ status: 'error', error: 'restaurant not found' })];
                }
                return [4 /*yield*/, data_1.default.query('select * from reviews where restaurant_id = $1', [req.params.id])];
            case 3:
                reviews = _a.sent();
                console.log(reviews);
                res.status(200).json({
                    status: 'success',
                    data: {
                        restaurants: restaurant.rows[0],
                        reviews: reviews.rows
                    }
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(404).json({ status: 'error', error: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getRestaurant = getRestaurant;
var createRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, location_1, price_range, restaurant, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, location_1 = _a.location, price_range = _a.price_range;
                return [4 /*yield*/, data_1.default.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [name_1, location_1, price_range])];
            case 1:
                restaurant = _b.sent();
                res.status(201).json({
                    status: 'success',
                    data: {
                        restaurants: restaurant.rows[0]
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                res.status(404).json({ status: 'error', error: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createRestaurant = createRestaurant;
var updateRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, location_2, price_range, id, restaurant, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_2 = _a.name, location_2 = _a.location, price_range = _a.price_range;
                id = req.params.id;
                return [4 /*yield*/, data_1.default.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [name_2, location_2, price_range, id])];
            case 1:
                restaurant = _b.sent();
                console.log(restaurant);
                res.status(201).json({
                    status: 'success',
                    data: {
                        restaurant: restaurant.rows[0]
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                res.status(404).json({ status: 'error', error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateRestaurant = updateRestaurant;
var deleteRestaurant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        try {
            id = req.params.id;
            result = data_1.default.query('DELETE FROM restaurants WHERE id = $1', [id]);
            res.status(200).json({
                status: 'success',
                message: 'restaurant successfully deleted'
            });
        }
        catch (error) {
            res.status(400).json({ status: 'error', error: error.message });
        }
        return [2 /*return*/];
    });
}); };
exports.deleteRestaurant = deleteRestaurant;
var addReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant_id, _a, name_3, review, rating, newReview, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                restaurant_id = req.params.id;
                _a = req.body, name_3 = _a.name, review = _a.review, rating = _a.rating;
                return [4 /*yield*/, data_1.default.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *', [restaurant_id, name_3, review, rating])];
            case 1:
                newReview = _b.sent();
                res.status(201).json({
                    status: 'success',
                    review: newReview.rows[0]
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(400).json({ status: 'error', error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addReview = addReview;
