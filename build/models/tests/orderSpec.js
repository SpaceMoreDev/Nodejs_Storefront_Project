"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var supertest_1 = __importDefault(require("supertest"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var randomstring_1 = __importDefault(require("randomstring"));
var server_1 = __importDefault(require("../../server"));
var order_1 = require("../order");
var user_1 = require("../user");
var request = (0, supertest_1.default)(server_1.default);
var orderStore = new order_1.OrderModel();
var userStore = new user_1.UserModel();
var createdOrder;
var user = {
    first_name: 'Tarek',
    last_name: 'Hisham',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
var order_prod = {
    quantity: 2,
    order_id: '5',
    product_id: '5',
};
var order1 = {
    status: 'complete',
    usrID: '5',
    date: new Date('4/4/2022'),
};
var order2 = {
    status: 'active',
    usrID: '5',
    date: new Date('4/4/2022'),
};
var jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
describe('testing order model routes: ', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userStore.create(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, orderStore.create(order1)];
                case 2:
                    createdOrder = (_a.sent());
                    expect(createdOrder.status).toEqual(order1.status);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing the main/index', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/orders')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing to create orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = jsonwebtoken_1.default.sign({ product: createdOrder }, process.env.TOKEN_SECRET);
                    return [4 /*yield*/, request
                            .post('/orders')
                            .set(__assign(__assign({}, jsonHeaders), { Authorization: 'Bearer ' + accessToken }))
                            .send(order2)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing to view orders from user ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessToken = jsonwebtoken_1.default.sign({ product: order_prod }, process.env.TOKEN_SECRET);
                    return [4 /*yield*/, server_1.default.post("/orders/:".concat(order_prod.order_id), function (req, res) {
                            // console.log(req.body); // the posted data
                            res
                                .set(__assign(__assign({}, jsonHeaders), { Authorization: 'Bearer ' + accessToken }))
                                .send({
                                quantity: order_prod.quantity,
                                productId: order_prod.product_id,
                            });
                            expect(res.status).toBe(200);
                        })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing to add products to an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server_1.default.post("/orders/:".concat(order_prod.order_id, "/products"), function (req, res) {
                        // console.log(req.body); // the posted data
                        res.send({
                            quantity: order_prod.quantity,
                            productId: order_prod.product_id,
                        });
                        expect(res.status).toBe(200);
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('testing to view products with orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var ord_prod;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/orders/products')];
                case 1:
                    ord_prod = _a.sent();
                    expect(ord_prod.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
