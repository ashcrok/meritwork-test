/**
 * Created by ashcrok on 10/21/2014.
 */
function getGetOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
}