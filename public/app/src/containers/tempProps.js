
// user Component
email={userAuth.email}
isAuthButtonsHidden={userAuth.isAuthButtonsHidden}
status={userAuth.status}
msgCategory={userAuth.msgCategory}
msgEmail={userAuth.msgEmail}
msgPassword={userAuth.msgPassword}
showCategoryMassage={showCategoryMassage}
phrase={page.phrase}
counter={page.counter}
showMassage={showMassage}
clearPageInfo={this.props.pageActions.clearPageInfo}
hits={page.hits}
registerNewUser={registerNewUser}
logOutUser={logOutUser}
loginUser={loginUser}


//page Component

page={page.page}
isOffline={page.isOffline}
email={userAuth.email}
isAuthButtonsHidden={userAuth.isAuthButtonsHidden}
phrase={page.phrase}
counter={page.counter}
hits={page.hits}
registerNewUser={this.props.userActions.registerNewUser}
preparingToOffline={preparingToOffline}
getNextPhrase={getNextPhrase}
getRandomPhrase={getRandomPhrase}
getBackPhrase={getBackPhrase}
updateCategoryContent={updateCategoryContent}
switchLanguage={switchLanguage}
switchOfflineOnLineMode={switchOfflineOnLineMode}
logChange={logChange}
getPhrase={getPhrase}
getSelectedCategory={getSelectedCategory}
syncCatAndRating={syncCatAndRating}
