(function() {
    var n = angular.module("myPgsApp");
    n.controller("PersonCopyrightCtrl", ["$scope", "personCopyrightService", "utilService", "webApiUtilService", "formValidationService", function(n, t, i, r, u) {
        function f() {
            n.isLoading = !0;
            t.getPersonCopyrights().then(function(t) {
                n.personCopyrights = t.data.items;
                n.listOfDates = t.data.dates;
                n.maxDayOfMonthToEditCopyright = t.data.maxDayOfMonthToEditCopyright;
                n.maxDayOfMonthToAddCopyright = t.data.maxDayOfMonthToAddCopyright;
                n.canAddNewItem = t.data.CanAddNewItem;
                n.canAddNewItemDenyReason = t.data.denyReason;
                n.dateNow = t.data.dateNow;
                n.isLoading = !1;
                n.PersonId = t.data.currentUserId
            })
        }
        function l(t) {
            n.model = angular.copy(t);
            n.model.MonthDate = n.listOfDates.find(function(n) {
                return n.Key === t.MonthDate
            });
            e(t.MonthDate)
        }
        function a(t) {
            n.model = angular.copy(t)
        }
        function e(i) {
            _.isNil(i) ? n.model.ScopeOfActivities = "" : t.getPersonInformationForVerificationView(n.PersonId, i).then(function(t) {
                n.model.ScopeOfActivities = t.data.ScopeOfActivities
            })
        }
        function v() {
            f();
            i.showGenericSuccess()
        }
        function y() {
            i.showGenericError();
            n.isLoading = !1
        }
        function s() {
            f();
            i.showGenericSuccess();
            n.isAddMode = 1;
            n.isPreviewMode = !1;
            n.isEditMode = !1;
            n.model = o();
            n.isLoading = !1
        }
        function h(t) {
            r.showResponseErrors(t, n.personCopyrightForm);
            n.isLoading = !1
        }
        function o() {
            return {
                MonthDate: null,
                IsCodeClassified: !1,
                Description: null
            }
        }
        function c() {
            var t = _.cloneDeep(n.model);
            return t.MonthDate = _.isNil(n.model.MonthDate) ? null : n.model.MonthDate.Key,
            t
        }
        n.isAddMode = 1;
        n.isEditMode = !1;
        n.isLoading = !0;
        n.model = o();
        n.isPreviewMode = !1;
        n.personCopyrights = [];
        n.maxDayOfMonthToEditCopyright = 0;
        n.maxDayOfMonthToAddCopyright = 0;
        n.canAddNewItem = 1;
        n.dateNow = moment().date;
        f();
        n.isFormVisible = function() {
            return n.isAddMode || n.isEditMode || n.isPreviewMode
        }
        ;
        n.cancel = function() {
            n.isAddMode = 1;
            n.isEditMode = !1;
            n.isPreviewMode = !1;
            n.model = o()
        }
        ;
        n.addPersonCopyright = function() {
            n.isAddMode = 1;
            n.isEditMode = !1;
            n.isPreviewMode = !1
        }
        ;
        n.editPersonCopyright = function(i) {
            t.getAvailableDatesForEdit(i.MonthDate).then(function(t) {
                n.listOfDates = t.data.dates;
                l(i);
                n.isAddMode = 1;
                n.isEditMode = !0;
                n.isPreviewMode = !1
            })
        }
        ;
        n.previewPersonCopyright = function(t) {
            a(t);
            e(t.MonthDate);
            n.isAddMode = 1;
            n.isEditMode = !1;
            n.isPreviewMode = !0
        }
        ;
        n.canSeeEditIcon = function(t) {
            var i = moment(t.MonthDate).set(MyPgs.Enums.PrecisionFormat.Date, n.maxDayOfMonthToEditCopyright).format(MyPgs.Enums.DateFormat.DateFormatCore)
              , r = moment(t.MonthDate).set(MyPgs.Enums.PrecisionFormat.Date, n.maxDayOfMonthToAddCopyright).format(MyPgs.Enums.DateFormat.DateFormatCore)
              , u = t.StatusId == MyPgs.Enums.personCopyrightStatus.Rejected && moment(n.dateNow).isSameOrBefore(i, MyPgs.Enums.PrecisionFormat.Day)
              , f = t.StatusId == MyPgs.Enums.personCopyrightStatus.ToVerify && moment(n.dateNow).isSameOrBefore(r, MyPgs.Enums.PrecisionFormat.Day);
            return f || u
        }
        ;
        n.canSeePreviewIcon = function(n) {
            var t = [MyPgs.Enums.personCopyrightStatus.ToVerify, MyPgs.Enums.personCopyrightStatus.Verified, MyPgs.Enums.personCopyrightStatus.GenerationInProgress, MyPgs.Enums.personCopyrightStatus.Rejected];
            return t.some(function(t) {
                return t == n
            })
        }
        ;
        n.canSeeDeleteIcon = function(t) {
            var i = moment(t.MonthDate).set(MyPgs.Enums.PrecisionFormat.Date, n.maxDayOfMonthToAddCopyright).format(MyPgs.Enums.DateFormat.DateFormatCore);
            return t.StatusId == MyPgs.Enums.personCopyrightStatus.ToVerify && moment(n.dateNow).isSameOrBefore(i, MyPgs.Enums.PrecisionFormat.Day)
        }
        ;
        n.updateCheckbox = function() {
            var t;
            n.model.IsCodeClassified = _.isNil(n.model.MonthDate) ? !1 : n.model.MonthDate.Value;
            e((t = n.model.MonthDate) === null || t === void 0 ? void 0 : t.Key)
        }
        ;
        n.deletePersonCopyright = function(i) {
            n.isLoading = !0;
            t.deletePersonCopyright(i).then(function(n) {
                return v(n)
            }, function(n) {
                return y(n)
            })
        }
        ;
        n.createPersonCopyright = function() {
            n.isLoading = !0;
            var i = c();
            t.createPersonCopyright(i).then(function(n) {
                return s(n)
            }, function(n) {
                return h(n)
            })
        }
        ;
        n.updatePersonCopyright = function() {
            n.isLoading = !0;
            var i = c();
            t.updatePersonCopyright(i).then(function(n) {
                return s(n)
            }, function(n) {
                return h(n)
            })
        }
        ;
        n.resetValidation = function(n) {
            u.resetValidation(n)
        }
        ;
        n.disableActionsButtons = function() {
            return n.isAddMode || n.isEditMode || n.isPreviewMode
        }
    }
    ])
}
)(),
function() {
    MyPgs = MyPgs || {};
    MyPgs.Enums = MyPgs.Enums || {};
    MyPgs.Enums.personCopyrightStatus = {
        Unknown: 0,
        ToVerify: 1,
        Rejected: 2,
        GenerationInProgress: 3,
        Verified: 4,
        NotRequired: 5,
        NoDescription: 6
    }
}(),
function() {
    var n = angular.module("myPgsApp");
    n.factory("personCopyrightService", ["$http", function(n) {
        return {
            getPersonCopyrights: function() {
                return n.get("/PersonCopyright/api/GetPersonCopyright")
            },
            createPersonCopyright: function(t) {
                return n.post("/PersonCopyright/api/CreatePersonCopyright", t)
            },
            updatePersonCopyright: function(t) {
                return n.put("/PersonCopyright/api/UpdatePersonCopyright", t)
            },
            deletePersonCopyright: function(t) {
                return n.delete("/PersonCopyright/api/DeletePersonCopyright", {
                    params: {
                        id: t
                    }
                })
            },
            getAvailableDatesForEdit: function(t) {
                return n.get("/PersonCopyright/api/GetAvailableDatesForEdit", {
                    params: {
                        dateMonth: t
                    }
                })
            },
            getPersonInformationForVerificationView: function(t, i) {
                return n.get("/PersonCopyright/api/GetPersonInformationForVerificationView", {
                    params: {
                        personId: t,
                        monthDate: i
                    }
                })
            }
        }
    }
    ])
}()
