
function ShowAllOperatorImgs () {
    var resultTableDiv = document.getElementsByClassName("resultTable")[0];
    var resultTable = resultTableDiv.querySelector("table");
    var allOperatorRw = resultTable.getElementsByTagName("tr");
    for (let i = 0; i < allOperatorRw.length; i++) {
        if (allOperatorRw[i].style.display === "none") {
            allOperatorRw[i].style.display = "block";
        }
        var rwP = allOperatorRw[i].getElementsByTagName("p");
        if (rwP.length > 0) {
            rwP[0].innerText = "タグを表示";
        }        
    }
    return;
}

function clickTagBtn (clickedChkBox) {

    // 全タグボタンをループしてONの数を取得
    var chkBoxs = document.getElementsByClassName("checks");
    var chkTags = new Array;
    var chkNum = 0;
    var clickedChkBoxFlag;
    for (i = 0; i < chkBoxs.length; i++) {

        clickedChkBoxFlag = false;

        if (clickedChkBox.value === chkBoxs[i].value) {
            clickedChkBoxFlag = true;
        }

        if ( chkBoxs[i].checked === true && clickedChkBoxFlag === false ) {
            chkTags.push(chkBoxs[i].value);
            chkNum ++;
        }
    }        

    // クリック総数が5以上の場合はクリックしたタグをFalseへ戻して終了
    if (clickedChkBox.checked === true && chkNum >= 5 ){
        clickedChkBox.checked = false;
        return;
    }
    if (clickedChkBox.checked === true ) {
        chkTags.push(clickedChkBox.value);
        chkNum ++;
    }
    if (chkNum === 0) {
        ShowAllOperatorImgs();
        return;
    }

    // operators.jsからタグ情報を取得
    var operatorsTagPair = GetOperatorsTagPair();

    // operator画像を全て取得
    var opeartorImgs = document.getElementsByClassName("operatorImg");

    // 表示するタグを検索
    for ( i = 0; i < opeartorImgs.length; i++) {
        var operatorId = opeartorImgs[i].id;
        var tagPairSet = operatorsTagPair[operatorId];

        var showFlag = false;
        var showTagPairs = new Array; // ["A + B" , "C + D"]
        
        for (j = 0; j < tagPairSet.length; j++) {

            var tagPairs = tagPairSet[j];

            if (tagPairs.length <= 0) {
                continue;
            }

            var allIncluded = true;
            var tmpShowTag = "";

            for (k = 0; k < tagPairs.length; k++) {
                if (!chkTags.includes(tagPairs[k])) {
                    allIncluded = false;
                    break;
                } else {
                    if (tmpShowTag === "") {
                        tmpShowTag = tagPairs[k];
                    } else {
                        tmpShowTag = tmpShowTag + " + " + tagPairs[k];
                    }
                }
            } 

            if (allIncluded === true ) {
                showTagPairs.push(tmpShowTag);
            }
        }

        // 画像の表示を切り替え、タグを表示
        if (showTagPairs.length > 0) {
            var showTag = "";
            for (l = 0; l < showTagPairs.length; l++) {
                if (l === 0) { 
                    showTag = showTagPairs[l];
                } else {
                showTag = showTag + ", " + showTagPairs[l];
                }
            }
            document.getElementById(operatorId + "_Rw").style.display = "block";
            document.getElementById(operatorId + "_Tag").innerText = showTag
        } else {
            document.getElementById(operatorId + "_Rw").style.display = "none";
        }

    }

}

function ResetTag () {

    var chkBoxs = document.getElementsByClassName("checks");
    for (i = 0; i < chkBoxs.length; i++) {
        if ( chkBoxs[i].checked === true ) {
            chkBoxs[i].checked = false;
        }
    }      

    ShowAllOperatorImgs();
    return;
}