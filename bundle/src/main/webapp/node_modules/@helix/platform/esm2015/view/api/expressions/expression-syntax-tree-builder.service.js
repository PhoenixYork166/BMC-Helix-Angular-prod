import * as jsep from 'jsep';
import { Injectable } from '@angular/core';
import { ExpressionOperator } from '@helix/platform/shared/api';
import * as i0 from "@angular/core";
export class RxExpressionSyntaxTreeBuilderService {
    constructor() {
        this.jsep = jsep;
        this.jsep.addBinaryOp(ExpressionOperator.Contains, 7);
        this.jsep.addBinaryOp(ExpressionOperator.Like, 7);
        this.jsep.addBinaryOp(ExpressionOperator.And, 2);
        this.jsep.addBinaryOp(ExpressionOperator.Or, 1);
        this.jsep.addBinaryOp(ExpressionOperator.Equal, 6);
        this.jsep.addBinaryOp(ExpressionOperator.In, 8);
        // Remove default unused binary operators.
        this.jsep.removeBinaryOp('||');
        this.jsep.removeBinaryOp('&&');
        this.jsep.removeBinaryOp('|');
        this.jsep.removeBinaryOp('^');
        this.jsep.removeBinaryOp('&');
        this.jsep.removeBinaryOp('==');
        this.jsep.removeBinaryOp('===');
        this.jsep.removeBinaryOp('!==');
        this.jsep.removeBinaryOp('<<');
        this.jsep.removeBinaryOp('>>');
        this.jsep.removeBinaryOp('>>>');
        // Remove default unused unary operators.
        this.jsep.removeUnaryOp('~');
        // Remove _, but keep $ to match AR expressions, e.g. $USER$.
        this.jsep.removeIdentifierChar('_');
    }
    buildTree(expression) {
        return this.jsep(expression);
    }
}
RxExpressionSyntaxTreeBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionSyntaxTreeBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RxExpressionSyntaxTreeBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionSyntaxTreeBuilderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: RxExpressionSyntaxTreeBuilderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=expression-syntax-tree-builder.service.js.map