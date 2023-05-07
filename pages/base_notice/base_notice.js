// pages/base_notice/base_notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    content: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.src
    this.fetchContent(type)
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

  /**
   * 显示内同
   * @param {*} type 类型：1无感支付服务规则
   */
  fetchContent: function (type) {
    switch (type) {
      case '1':
        this.setData({
          title: '无感支付服务规则',
          content: [
            '1.您须在个人中心-我的车辆绑定车辆相关信息，即可提供车辆出入场识别服务。',
            '2.您须在个人中心-我的钱包中开通无感支付，目前无感支付仅支持钱包余额充值使用。若' +
            '余额不足，则会提示余额不足，无法快速过闸，需要您手动在万家智停小程序进入停车缴费或' +
            '扫描出口付款二维码进行支付，请注意及时查看您的余额信息。',
            '3.开通无感支付后，车辆出场时，停车场系统将通过识别车牌自动向钱包发起扣款。',
            '4.您在开通无感支付后，即可享受畅行所有万家智停相关合作停车场的服务。',
            '5.如有疑问，请咨询万家智停在线客服或拨打服务热线0772-xxxxxxxx，感谢您对万家智停的支持和理解。'
          ]
        })
        break
      case '2':
        this.setData({
          title: '月卡说明',
          content: [
            '1.您可在万家智停小程序或相关平台（支持线上办理月卡的合作车场）中填写相关信息办理' +
            '月卡，办理成功后即可享受在月卡有效期内无限次停车，道闸自动识别等相关服务，让您无' +
            '需等待，畅行停车场。',
            '2.若您已在万家智停合作停车场办理过相关月卡业务，万家智停将同步相关数据自动添加到您' +
            '的账户中，您可在万家智停小程序或相关平台查看该卡信息，享受月卡续费等相关服务。',
            '3.该月卡为一车一用，超出登记办理车辆范围使用无效。',
            '4.请您注意所持月卡的有效期限，若不及时续费，可能会成为无效月卡，失去该月租车位。',
            '5.本月卡的最终解释权归广西科联科技有限公司所有，如有疑问，请咨询万家智停在线客服' +
            '或拨打服务热线0772-xxxxxxxx，感谢您对万家智停的支持和理解。'
          ]
        })
        break
      case '3':
        this.setData({
          title: '用户协议',
          content: [
            '“停车线"平台通过以下条款为您提供服务。您应当阅读并遵守《用户服务协议》（以下简称为“本协议”），本协议是您与“停车线”之间的法律协议。您在使用“停车线”提供的各项服务之前，请您务必审慎阅读、充分理解各条款内容，特别是隐私保护、用户信息、免责以及争议管辖与法律适用的条款。除非您已阅读并接受本协议所有条款，否则您无权使用“停车线”提供的服务。您使用“停车线”的服务即视为您已阅读并同意本协议的约束，包括“停车线”对本协议服务条款随时做的任何修改。',
            '如果您未满18周岁，请务必在家长和其他法定监护人的陪同下阅读本服务协议，并在进行注册、支付等任何行为或使用停车线的其他任何服务前，应事先征得您的家长和其他法定监护人的同意。',
            '一、服务条款的确认及接受',
            '1.1 停车线各项电子服务的所有权、知识产权和运营权均归属于广西科联科技有限公司所有，本软件提供的服务将完全按照其发布的服务条款和操作规则严格执行。您确认所有服务条款并完成注册程序时，本协议在您与本软件间成立并发生法律效力，同时您成为本软件正式用户。',
            '1.2 您确认所有服务条款并使用停车线服务时，将视为您同意本协议，表明自愿接受本协议全部条款，本协议将构成您与广西科联科技有限公司及其主办的停车线（包含在线开放平台及其他现在或未来开发或升级换代的自有平台，以下合称为“停车线平台”）之间直接有约束力的法律文件，同时您成为停车线的正式用户。',
            '1.3 根据国家法律法规的变化及停车线运营需要，停车线有权对本协议条款及其补充协议适时地进行修改，修改后的内容一旦以任何形式公布在停车线相应平台上则立即生效，并取代此前相关内容。您应不时关注停车线公告、提示信息及协议、规则等相关内容的变动。如您不同意本协议及其补充协议的修改，您可以主动停止使用停车线提供的服务；您一旦使用停车线服务，即视为您已了解并完全同意本协议各项内容，包括停车线对本协议及其补充协议随时所做的任何修改。',
            '1.3您在使用停车线平台某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），您在使用该项服务前请阅读并同意相关的单独协议，您使用前述特定服务，即视为您已阅读并同意接受相关单独协议。',
            '2.服务说明',
            '2.1 停车线服务的具体内容由停车线根据实际运营情况提供，若您对停车线服务的具体内容有疑义，可致电停车线客户服务电话（0772-2600865）予以询问。',
            '2.2 鉴于网络服务的特殊性，您同意停车线有权不经事先通知，随时变更、中断或终止部分或全部的网络服务（包括收费网络服务），且无需承担赔偿责任。停车线不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。',
            '2.3 停车线会定期或不定期地对提供服务的平台或相关的设备进行检修、维护或升级，此类情况发生之前，停车线将会提前通过短信、平台消息公告或推送等不同方式向您发送提醒通知。',
            '2.4 免责声明：因以下情况造成停车线网络服务在合理时间内的中断，停车线无需为此承担任何责任；',
            '2.4.1 因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因；',
            '2.4.2 用户的软硬件设备和通信线路、供电线路出现故障的；',
            '2.4.3 因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行原因、 第三方服务瑕疵或政府行为等原因。 尽管有前款约定，停车线将采取合理行动积极促使服务恢复正常。',
            '2.5 第三方责任：若您在使用停车线提供的相应服务的过程中，因可归责于第三方的原因而导致您遭受损失的，则停车线会协助您与第三方解决问题，为您提供帮助与支持。',
            '三、用户个人信息保护及授权',
            '3.1 停车线账号（即停车线用户ID）的所有权归停车线所有，您完成注册申请手续后，即可获得停车线账号，成为停车线用户。',
            '3.2 您应及时填写详尽、准确、完整的个人资料，并不断更新注册资料，并保证注册资料符合及时、详尽、准确、完整 的要求。所有原始填入的资料均作为注册资料。 如果因注册信息不真实或更新不及时而引发的相关问题，将由您自行承担相应的责任，停车线不负任何责任，并且停车线保留终止您使用各项服务的权利。',
            '3.3 停车线账号包括账户名称和密码，您可使用设置的账户名称（手机号）和密码登录停车线；在账号使用过程中，为了保障您的账号安全基于不同的终端以及您的使用习惯，我们可能采取不同的验证措施识别您的身份。例如您的账户首次登录，我们可能通过密码加校验码的方式识别您的身份，验证方式包括但不限于短信验证码、服务使用信息 验证等。',
            '3.4 您应妥善保管自己的账号，不得将账号、密码转让或出借予他人使用。如您发现账号遭他人非法使用，请您立即通知停车线。除法律明确规定、司法裁定或广西科联科技有限公司明确同意外，若因您擅自转让或出借个人账号或密码或因个人原因导致账号或密码泄露、被盗用、遗失等，产生的责任及后果均由您自行承担。',
            '3.5 在您注册停车线账户、使用停车线服务时，停车线会收集您必要的个人身份识别资料（包括但不限于手机号、车辆 信息等），您对此予以理解并确认同意。停车线不对外公开或向第三方提供单个用户的注册资料、支付信息等。但在以下情况下，停车线可能会披露您的信息：',
            '3.5.1 事先获得您的授权；',
            '3.5.2 您使用共享功能；',
            '3.5.3 根据法律、法规、法律程序的要求或政府主管部门的强制性要求；',
            '3.5.4 以学术研究或公共利益为目的；',
            '3.5.5 为维护停车线的合法权益，例如查找、预防、处理欺诈或安全方面的问题；',
            '3.5.6 符合相关服务条款或使用协议的规定。',
            '3.5.7 参加停车线与第三方合作商共同举办活动、奖品需要个人资料确定到账。',
            '3.6 为保护您的个人信息，停车线平台主要通过《隐私政策》向您清楚地介绍 涉及您个人信息的获取、使用、处理及保护方式等，建议您完整仔细地阅读 《隐私政策》，以帮助您更好地保护您的个人信息。',
            '3.7 您充分理解并同意：',
            '3.7.1 接收通过邮件、短信、电话等形式，向在本软件注册、缴费的用户发送活动信息动态等内容；',
            '3.7.2 为配合行政监管机关、司法机关执行工作，在法律规定范围内停车线有权向上述行政、司法机关提供您在使用本软件时所储存的相关信息，包括但不限于您的注册信息等，或使用相关信息进行证据保全，包括但不限于公证、见证等；',
            '3.7.3 停车线依法保障您在使用过程中的知情权和选择权，在您使用本服务过程中，涉及您设备自带功能的服务会提前征得您同意，您一经确认，停车线有权开启包括但不限于收集地理位置，使用摄像头等提供服务必要的辅助功能。',
            '3.7.4 停车线有权根据实际情况，在法律规定范围内自行决定单个用户在本软件及服务中数据的最长储存期限以及用户日志的储存期限，并在服务器上为其分配数据最大存储空间等。',
            '4．用户行为规范',
            '4.1 您同意接受停车线、停车线关联公司、或停车线授权的第三方通过电子邮件或其他方式向您发送相关服务推广信息。',
            '4.2.1 不得制作、复制、发布、传播或以其它方式传送含有下列内容之一的信息：',
            '1) 反对宪法所确定的基本原则的；',
            '2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；',
            '3)损害国家荣誉和利益的；',
            '4)煽动民族仇恨、民族歧视、破坏民族团结的；',
            '5)破坏国家宗教政策，宣扬邪教和封建迷信的；',
            '6）散布谣言，扰乱社会秩序，破坏社会稳定的；',
            '7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；',
            '8)侮辱或者诽谤他人，侵害他人合法权利的；',
            '9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；',
            '10)以非法民间组织名义活动的；',
            '11)含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；',
            '12)含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的。',
            '4.2.2 不得为任何非法目的而使用停车线服务系统；',
            '4.2.3 不利用停车线服务从事以下活动：',
            '1) 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；',
            '2)未经允许，对计算机信息网络功能进行删除、修改或者增加的；',
            '3)未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；',
            '4)故意制作、传播计算机病毒等破坏性程序的；',
            '5)其他危害计算机信息网络安全的行为。',
            '4.3 如您违反本协议或相关服务条款的规定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括 合理的律师费，您同意赔偿停车线及其合作公司、关联公司，并使之免受损害。对此，停车线有权根据您的行为性质，采取包括但不限于删除发布的信息内容、暂停使用许可、终止服务、限制使用、回收停车线账号、 追究法律责任等措施。对恶意注册停车线账号或利用停车线账号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，停车线有权回收其账号。同时，停车线会视司法部门的要求，协助调查。',
            '4.4 您须对自己在使用停车线服务过程中的行为承担法律责任。您承担法律责任的形式包括但不限于：对受到侵害者进行赔偿以及在停车线首先承担了因您行为导致的行政处罚或侵权损害赔偿责任后，您应给予停车线等额的赔偿；并承担法律规定的其他法律责任。',
            '5．知识产权',
            '5.1 停车线依法享有停车线服务平台相应的知识产权，包括但不限于著作权、商标权、专利权或其它专属权利等 ，受到相关法律的保护。未经停车线明示授权，上述资料均不得用于任何商业目的。',
            '5.2 “停车线”的整体内容版权属于广西科联科技有限公司。“停车线”所有的产品、技术与所有程序均属于“停车线”知识产权，在此并未授权。“停车线”所有设计图样以及其他图样、产品及服务名称，均为广西科联科技有限公司所享有的商标、标识。任何人不得使用复制或用作其他用途。未经停车线许可，任何单位和个人不得私自复制、传播、展示、镜像、上载、下载、使用，或者从事任何其他侵犯停车线知识产权的行为。否则，停车线将追究相关法律责任。',
            '5.3 您同意并已充分了解本协议的条款，承诺不将已发表于停车线的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。',
            '5.4 除法律另有强制性规定外，未经停车线明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用停车线的信息内容，否则，停车线有权追究其法律责任。',
            '6. 法律适用',
            '6.1 本用户条款的订立、执行和解释及争议的解决均应适用中华人民共和国法律。如用户就本协议内容或其执行发生任何争议，用户应尽量与停车线友好协商解决;协商不成时，任何一方均可向“停车线”所在地的人民法院提起诉讼。停车线未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。如本协议条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议条款的其余条款仍应有效并且有约束力。本协议所有条款的最终解释权属于“停车线”。',
            '6.2 因法律法规的变更或实际业务的调整，本协议如未能覆盖您和广西科联科技有限公司的全部权利义务。停车线平台的《隐私政策》、《平台规则》、告示公告等均构成本协议的补充协议，与本协议不可分割且具有同等法律效力。如您使用停车线平台服务，视为您同意上述补充协议。',
            '如您主动点击“同意”，则本协议将立即生效，并构成您和广西科联科技有限公司及其主办的停车线之间有约束力的法律文件。请您再次确认已全部阅读并充分理解上述协议。',
            ''
          ]
        })
        break
      case '4':
        this.setData({
          title: '隐私协议',
          content: [
            '停车线是由广西科联科技有限公司运营。停车线(以下或称“我们”)非常重视用户(“您") 的隐私和个人信息保护。将按照法律法规要求和业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。您在使用我们的服务时，我们可能会收集和使用您的个人信息。本隐私政策旨在帮助您了解我们会收集哪些数据、为什么收集这些数据、会利用这些数据做什么以及我们如何保护这些数据。了解这些内容，对于您行使个人权利及保护您的个人信息至关重要，请您在使用停车线产品或服务前务必抽出时间认真阅读本政策。当您开始下载、访问或使用停车线产品或服务，即表示您已经同意本隐私权政策并信赖我们对您的信息处理方式。',
            '本隐私政策将帮助您了解以下内容：\n' +
            '（1）我们如何收集以及收集您的哪些个人信息；\n' +
            '（2）我们如何使用您的个人信息；\n' +
            '（3）我们如何使用Cookie和同类技术；\n' +
            '（4）我们如何共享、转让、公开披露您的个人信息；\n' +
            '（5）我们如何保护和保存您的个人信息；\n' +
            '（6）您如何管理您的个人信息；\n' +
            '（7）未成年人信息的保护；\n' +
            '（8）通知和修订；\n' +
            '（9）如何联系我们',
            '一、我们如何收集和使用您的个人信息',
            '我们提供服务时，可能会收集、存储和使用下列与您有关的信息，如果您不提供下述相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些服务，或者无法达到相关服务欲达到的效果。不同用户类型、服务内容对应收集的个人信息亦有不同，具体见下，您可根据自身需要，选择成为我们哪种类型的用户，您的选择即代表同意授权我们收集您对应的个人信息：\n' +
            '用户类型\n' +
            '我们提供的主要服务（此处仅为主要服务且为简述，具体以实际提供为准）对应可能收集的个人信息（此处仅为简述，具体详见下文）',
            '1.非注册用户：\n' +
            '（1）停车线智慧停车（即通过停车线配套设备及系统自动识别车辆、计算停车费、入场及出场结算后的车辆自动放行）；\n' +
            '（2）线下扫码支付及H5/小程序输入车牌的电子支付服务；\n' +
            '（3）查看/查找附近车场；\n' +
            '（4）车辆车牌信息；\n' +
            '（5）停车服务交易信息（含支付订单信息）；\n' +
            '（6）设备信息；\n' +
            '（7）位置信息（可选项，如您不提供，将无法显示当前位置对应附近车场的功能）；\n' +
            '（8）从第三方合作伙伴获取并经您授权同意的信息（可选项）。',
            '2.注册但未绑定车牌的用户\n' +
            '除了提供非注册用户对应的主要服务外，还提供：\n' +
            '（1）个人信息设置/修改/清除服务；\n' +
            '（2）信息推送服务（即停车交易明细或营销活动信息推送）；\n' +
            '除了收集非注册用户对应的信息外，还收集：\n' +
            '（1）手机号；\n' +
            '（2）您填写或上传的个人基础信息，如头像、昵称、性别、生日；\n' +
            '（3）您在接受服务时主动填写的联系人、联系电话、联系地址；\n' +
            '（4）前述服务对应的交易信息，如优惠券。',
            '3.注册且绑定车牌（未认证的用户）\n' +
            '除了收集上述两类用户对应的信息外，还收集：\n' +
            '（1）绑定的车辆车牌信息及其位置信息、停车服务交易信息；\n' +
            '（2）交易记录信息、设备信息；',
            '4 . 注册且绑定车牌（已认证的用户）' +
            '除了收集上述三类用户对应的信息外，还收集：\n' +
            '（1）行驶证信息；\n' +
            '（2）手机号及验证码。\n' +
            '注：上述服务中的“停车线智慧停车”和“电子支付服务”为我们目前的基础核心功能， 除此之外的其他服务为我们的附加功能，但上述基础核心功能及附加功能的组成及分类可能会 是随着我们产品的运营、发展将有所增加或调整。' +
            ' 除了收集上述四类用户对应的信息外，还收集：' +
            '  •	存储权限\n' +
            '  •	相机权限\n' +
            '  •	拨打手机电话权限\n' +
            '注： 上述服务中， 存储权限， 目的是拍照存储、 临时文件存储、 用户进行车牌认证时上传图像； 相机权限， 目的是用户通过扫描二维码支付停车费时需打开相机， 进行车牌认证， 反馈意见时上传照片； 拨打手机号权限， 目的是用户联系客服时可直接点击客服电话快速拨打 ',
            '1.您在使用我们的服务时主动提供的个人信息',
            '1.1您在注册账户时填写的信息\n' +
            '例如：您在注册账户时，向我们提供您将使用的停车线账户名称、验证码、您本人的手机号码； 您可以随时查看、修改、补充您的昵称、性别以及您的车牌实名验证等相关信息，这些信息均属于您的“账户信息”。',
            '1.2您在使用我们的服务时上传的信息\n' +
            '例如：您在使用我们服务时上传的头像、车场照片等图片信息。',
            '1.3您通过我们的客服或参加我们举办的活动时所提交的信息\n' +
            '例如：客服与售后服务时，您有可能会在与我们的客服人员沟通时，提供注册信息外的其他信息，如当您申请变更地址、联系人或联系电话等，为保证您的帐号安全，我们的客服可能会要求您提供账号信息， 用于核验您的身份。当您参加我们举办的活动时，您可能需要提供部分个人信息。',
            '2.我们在您使用服务时获取的信息',
            '2.1设备信息：为了让您快速地找到您所需要的停车场、停车位信息，我们可能会收集您使用我们的产品和服务的设备信息（包含设备名称、设备型号、设备识别码、操作系统和应用程序版本、语言设置、分辨率、 服务提供商网络ID（PLMN））来为您提供停车场、停车位信息的最优方式。',
            '2.2搜索内容：您可以通过搜索来精准地找到您需要的服务信息。\n' +
            '请您注意，您的搜索关键词信息无法单独识别您的身份，不属于您的个人信息，我们有权以任何目的对其进行使用，只有当您的搜索关键词信息与您的其他信息互相结合使用并可以识别您的身份时，在结合使用期间，我们会将您的搜索关键词信息作为您的个人信息按照本隐私政策对其进行处理和保护。',
            '2.3停车服务交易信息：基于我们平台向您提供的智能停车服务以及支付服务形成的交易信息，包括您所驾驶的车辆入场记录、出场记录、停车场名称、车辆车牌信息、支付方式、支付金额等。',
            '2.4车辆车牌信息：为了实现智慧停车的功能，我们需要识别并收集您的车辆外观、车牌号、车牌颜色等信息，以便结算停车费。',
            '2.5支付订单信息：您可以选择停车线的第三方支付机构（包括微信支付及支付宝等支付通道，以下简称“支付机构”）所提供的支付服务。支付功能本身并不收集您的个人信息，但我们需要将您的订单号与交易金额信息与这些支付机构共享以实现其确认您的支付指令并完成支付。',
            '2.6其它相关信息：为了帮助您更高的使用我们产品或服务，我们会收集相关的信息，例如浏览信息。',
            '3.我们从第三方合作伙伴获取的信息',
            '3.1我们可能会获得您在使用第三方合作伙伴服务时所产生或分享的信息。例如，您在使用停车线账户登录第三方合作伙伴服务（查违章、洗车保养等）时，我们会获得您登录第三方合作伙伴服务的名称、登录时间、方便您进行授权管理。请仔细阅读第三方合作伙伴服务的用户协议或隐私政策。',
            '3.2我们可能从第三方获取您授权共享的账户信息（头像、昵称、账号等），并在您同意本隐私政策后将您的第三方账户与您的停车线账户绑定或关联，使您可以通过第三方账户直接登陆并使用我们的产品或服务。我们会将依据与第三方的约定、对个人信息来源的合法性进行确认后，在符合相关法律和法规规定的前提下，使用您的这些个人信息。',
            '3.3 您与我们的关联方、我们合作伙伴之间互动时我们获得的相关信息。',
            '4.您可选择是否授权我们收集和使用您的下述个人信息',
            '4.1位置信息：为使您的停车更便捷或更有可选择性，我们会基于您的位置信息，为您个性化推荐服务。',
            '4.1.1授权方式：您可在设备中向我们开启您的地理位置（位置信息）的访问权限，以实现附加功能所设计信息的收集和使用。我们会指引您在您的设备系统中完成设置。',
            '4.1.2请您注意，您想我们开启位置获取权限即代表您授权我们可以收集和使用您的位置信息来实现 上述附加功能，使用过程中，您可随时关闭权限，即代表您取消了这项授权。您关闭权限的决定不会影响此前基于您的授权进行的个人信息处理。如果您不提供位置信息，您依然可以使用停车线停车服务，但您可能无法使用这些可以为您所带来的附加功能或在享受某些功能服务时需要重复填写一些信息。',
            '4.2我们的部分服务可能需要您提供特定的个人敏感信息来实现特定功能。若您选择不提供该类信息，则可能无法正常使用特定功能，但不影响您使用服务中的其他功能，若您主动提供个人敏感信息，即表示您同意我们按本隐私政策所属目的和方式来处理您的个人敏感信息。',
            '4.3 原则上，您提供的个人信息越全面，越有助于我们为您提供个性化服务推荐和更优的服务体验，但如果您不提供补充信息，不会影响您正常使用停车线智慧停车、电子付费的基本功能。',
            '二、我们如何使用您的个人信息',
            '（一）使用目的和方式',
            '我们严格遵守法律法规的规定及与用户的约定，将收集的信息用于以下用途，若我们超出以下用途使用您的信息，我们将再次向您进行说明，并征得您的同意。',
            '1.向您提供服务。',
            '2.产品开发和服务优化。为了提供个性化内容及改进服务质量等目的而获得的您的个人信息；对于从您的各种设备上收集到的信息，我们可能会将它们进行关联，以便我们能在这些设备上为您提供一致的服务。',
            '3.为保障交易安全所必须的功能。为提高我们产品与/或服务系统的安全性，防钓鱼网站欺诈和保护账号安全，我们可能会通过了解并分析您的浏览信息、订单信息、您常用的软件信息、设备信息等判断您的账号风险，并可能会记录一些我们认为有风险的连接（“URL”），排查可能存在的风险。',
            '4.邀请您参与有关我们服务的调查。我们可能收集您对广告投放和其他促销及推广活动的反馈信息，并根据您的反馈，帮助我们重新审视、评估 并进行改善广告投放和其他促销及推广活动。',
            '（二）具体使用规则',
            '1.我们会根据本隐私政策的约定并为实现我们的产品或服务功能对所收集的个人信息进行合理使用。',
            '2.在收集您的个人信息后，尤其是个人敏感信息，我们将采用加密等安全措施予以保护，或通过技术手段对信息进行去标识化处理，去标识化处理的信息将无法识别主题。请您了解并同意，在此情况下我们有权使用已经去标识化的信息；并在不透露您个人信息的前提下，我们有权对用户数据库进行分析并予以商业化的利用。',
            '3.请您注意，您在使用我们的产品或服务时所提供的所有个人信息，除非您删除或通过系统设置拒绝我们收集，否则将在您使用我们的产品与/或服务期间持续授权我们使用。',
            '4.我们会对我们的产品与/或服务使用情况进行统计，并可能会与公众号或第三方共享这些统计信息以展示我们的产品与/或服务的整体使用趋势。但这些统计 信息不包含您的任何身份识别信息。',
            '5.当我们展示您的个人信息时，我们会采用包括内容替换、匿名处理方式对您的信息进行脱敏，以保护您的信息安全。',
            '6.为了让您有更好的体验、改善我们的服务或经您同意的其他用途，在符合相关法律法规的前提下，我们可能将通过某些服务所收集的信息用于我们的其他服务。例如，将您在使用我们某项服务时的信息，用于另一项服务中向您展示个性化的内容或广告、用于用户研究分析与统计等服务。',
            '7.为了确保服务安全，帮助我们更好地了解系统的运营情况，我们可能记录相关信息。例如，您使用的频率、总体使用情况、性能数据以及系统的来源。我们不会将我们存储在分析软件中的信息与您在系统中提供的个人身份信息相结合。',
            '8. 当我们要将您的个人信息用于本隐私政策未载明的其他用途时，或基于特定目的收集而来的信息用于其他目的时，会通过您主动做出勾选的形式事先征求您的同意。',
            '（三）征得授权同意的例外',
            '您充分知晓，以下情形中，我们收集、使用个人信息无需征得您的授权同意：\n' +
            '1.与国家安全、国防安全直接相关的；\n' +
            '2.与公共安全、公共卫生、重大公共利益直接相关的；\n' +
            '3.与犯罪侦查、起诉、审判和判决执行等直接相关的；\n' +
            '4.出于维护个人信息主体或其他个人生命、财产等重大合法权益但又很难得到本人同意的；\n' +
            '5.所收集的个人信息是个人信息主体自行向社会公众公开的；\n' +
            '6.从合法披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；\n' +
            '7.根据个人信息主体要求签订和履行合同所必需的；\n' +
            '8.用于维护所提供的产品或服务的安全稳定运营所必需的，例如发现、处置产品或服务的故障；\n' +
            '9.为合法的新闻报道所必需的；\n' +
            '10.为学术研究机构，处于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时， 对结果中所包含的个人信息进行去标识化处理的；\n' +
            '11.	法律法规规定的其他情形。',
            '三、我们如何使用Cookie和同类技术',
            '1.Cookies的使用',
            '1.1为实现您联机体验的个性化需求，使您获得更轻松的访问体验。我们会在您的计算机或移动设备上 发送一个或多个名为Cookies的小数据文件，指定给您的Cookies是唯一的，它只能被Cookies发布给您的域中的Web服务器读取。我们向您发送Cookies是为了简化您重复登录的步骤、存储您的购物偏好或您 购物车中的商品等数据进而为您提供购物的偏好设置、帮助您优化对广告的选择与互动、帮助判断您的登录状态以及账户或数据安全。',
            '1.2 我们不会将Cookies用于本隐私政策所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookies。您可以清除计算机上保存的所有Cookies，大部分网络浏览器会自动接受Cookies，但您通常可根据自己的需求来修改浏览器的设置以拒绝Cookies；另外，您也可以清除软件内保存的所有Cookies。但如果您这么做， 您可能需要在每一次访问停车线网站时，亲自更改用户设置，而且您之前所记录的相应信息也均会被删除， 并且可能会对您所使用服务的安全性有一定影响。',
            '1.2 我们不会将Cookies用于本隐私政策所述目的之外的任何用途。您可根据自己的偏好管理或删除Cookies。您可以清除计算机上保存的所有Cookies，大部分网络浏览器会自动接受Cookies，但您通常可根据自己的需求来修改浏览器的设置以拒绝Cookies；另外，您也可以清除软件内保存的所有Cookies。但如果您这么做， 您可能需要在每一次访问停车线网站时，亲自更改用户设置，而且您之前所记录的相应信息也均会被删除， 并且可能会对您所使用服务的安全性有一定影响。',
            '2.网络Beacon和同类技术的使用',
            '除Cookies外，我们还会在网站上使用网络Beacon等其他同类技术。我们的网页上常会包含一些电子图像 （称为“单像素”GIF文件或“网络beacon”）。我们使用网络beacon的方式有：',
            '2.1通过在停车线平台或网站上使用网络beacon，计算用户访问数，并通过访问Cookies辨认注册的停车线用户。',
            '2.2 通过得到的Cookies信息，为您提供个性化服务。',
            '四、我们如何共享、转让、公开披露您的个人信息',
            '（一）共享\n' +
            '我们不会与停车线以外的任何公司、组织和个人共享您的个人信息，但以下情况除外：',
            '1．事先获得您明确的同意或授权',
            '2．现行法律、法律程序的要求、或者行政机构/司法依法提出的共享；',
            '3．我们可能会将您的个人信息与我们的关联方共享。为便于我们基于关联账号共同向您提供服务，推荐您可能感兴趣的信息或保护关联方或其他用户或公众的 人身财产安全免遭侵害等原因，您的个人信息可能会与我们的关联方共享。我们只会共享必要的个人信息， 如果我们改变个人信息的使用及处理目的，将再次征求您的授权同意。对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的 说明、本隐私政策及其他任何相关的保密和安全措施来处理个人信息。',
            '4．与停车线的授权合作伙伴共享：我们已接入相关合作伙伴的服务，会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于与产品或服务无关的其他用途。我们的合作伙伴目前包括以下类型：',
            '4.1技术服务的供应商。我们可能会将您的个人信息共享给支持产品/服务功能的第三方，这些支持包括为我们提供基础设计 技术服务、支付服务、数据处理等，如我们需要将您的支付金额与第三方支付机构共享以实现其确认 支付指令并完成支付等。第三方供应商只能接触履行其职能所必要接触的信息，我们将通过相关合作协议明确其接触使用个人信息的范围、目的，禁止其用于其它目的。',
            '4.2服务平台或服务提供商。当您选择使用该第三方服务时，您授权我们将您的个人信息提供给 第三方服务平台或服务提供商，以便其基于相关信息为您提供服务。第三方服务商只能接触因提供相关服务之必要的信息，我们将通过相关合作协议明确其接触使用个人信息的范围、目的，禁止其用于其它目的。',
            '4.3广告服务类的合作方除非得到您的许可，否则我们不会将您的个人身份信息（指可以识别您身份的信息，例如姓名或手机号） 与提供广告的合作伙伴分享。对于广告合作伙伴，我们可能会向其提供有关其广告覆盖面和有效性的信息， 而不会提供您的个人身份信息，或者我们将这些信息进行匿名化处理，以便它不会识别到您个人。 这类合作伙伴可能将上述信息与他们合法获取的其他数据相结合，以进行广告或决策建议。',
            '4.4支付，我们会与支付宝、微信、银联、建行支付等合作方共享网络状态、手机状态来保证支付功能的正常运转。',
            '4.5合作室内导航软件，提供室内地图寻车的能力。',
            '4.6腾讯地图，提供地图定位，车场位置标记，POI点搜索等涉及位置相关的服务，用于搜索附近停车场。',
            '4.7消息推送，提供用户消息通知、推送。',
            '4.8友盟，提供用户数据、事件点击触发相关的统计行为。',
            '4.9对于我们与之进行个人信息共享的任何第三方，我们将在与签署的合作协议、保密协议等中明确约定其应当按照我们的隐私政策、数据安全管理要求、行业相关安全标准、国家相关法律法规的要求采取相应的安全管理措施和技术措施，确保个人信息的安全。同时我们将明确第三方使用个人信息的目的、范围，严格禁止其将个人信息用于超越业务必要、提供相关服务之必要或您明确授权的范围。',
            '5．我们可能会将收集到的信息用于大数据分析。例如，我们将收集到的信息用于分析形成不包含任何个人信息的城市热力图或行业洞察报告。我们可能对外公开并与我们的合作伙伴分享经统计加工后不含身份识别内容的信息，用于了解用户如何使用我们服务或让公众了解我们服务的总体使用趋势。',
            '（二）转让\n' +
            '我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：',
            '1．实现获得您明确的同意或授权；',
            '2．在涉及合并、收购、资产转让或类似的交易时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本隐私政策的约束，否则，我们将要求该公司、组织重新向您征求授权同意。',
            '（三）公开披露',
            '我们仅会在以下情况下，且采取符合业界标准的安全防护措施的前提下，才会公开披露您的个人信息：\n' +
            '基于法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会向有权机关披露 您的个人信息。但我们保证，在上述情况发生时，我们会要求披露请求方必须出具与之相应的 有效法律文件，并对被披露的信息采取符合法律和业界标准的安全防护措施。' +
            '若您通过停车线平台从事违反法律法规、服务协议、隐私政策或平台相关规则的行为，为避免给任何人造成人身财产损害，我们可能会依据相关法律法规或征得您同意的情况下披露关于您的个人信息。',
            '（四）共享、转让、公开披露个人信息授权同意的例外',
            '根据相关法律法规的规定， 在以下情形中，我们可以在不征得您的授权同意的情况下共享、转让、公开披露您的个人信息；',
            '1.与国家安全、国防安全有关的；\n' +
            '2.与公共安全、公共卫生、重大公共利益有关的；\n' +
            '3.与犯罪侦查、起诉、审判和判决执行等有关的；\n' +
            '4.出于维护您或其他个人生命、财产等重大合法权益但又很难得到本人同意的；\n' +
            '5.您自行向社会公众公开的个人信息； \n' +
            '6.从合法公开披露的信息中收集到的个人信息的，如合法的新闻报道、政府信息公开等渠道。',
            '根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别 个人信息主体的，对此类数据的保存及处理 将无需另行向您通知并征得您的同意。',
            '五、我们如何保护和保存您的个人信息',
            '（一）我们保护您个人信息的技术与措施',
            '1.数据安全技术措施：我们会采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的个人信息 遭到未经授权的访问使用、修改，避免数据的损坏或丢失。',
            '1.1停车线的网络服务采取了传输层安全协议等加密技术，通过https等方式提供浏览服务， 确保用户数据在传输过程中的安全。',
            '1.2停车线采取加密技术对用户个人信息进行加密保存，并通过隔离技术进行隔离。',
            '1.3在个人信息使用时，例如个人信息展示、个人信息关联计算，我们会采用包括内容替换在内多种数据脱敏技术增强个人信息在使用中安全性。',
            '1.4停车线采用严格的数据访问权限控制、多重身份认证、数据分类分级技术、规范数据安全 开发保护个人信息，避免数据被违规使用。',
            '1.5停车线还将采用代码安全自动检查、数据访问日志分析技术进行个人信息安全设计。',
            '2.停车线保护个人信息采取的其他安全措施：',
            '2.1停车线通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范个人信息的存储和使用。',
            '2.2停车线通过信息接触者保密协议、监控和审计机制来对数据进行全面安全控制。',
            '2.3我们仅允许有必要知晓这些信息的停车线及停车线关联方的员工、合作伙伴访问个人信息， 并为此设置了严格的访问权限控制和监控机制。我们同时要求可能接触到您个人信息的所有人员履行相应的保密义务。如果未能履行这些义务，可能会被追究法律责任或被中止与停车线的合作关系。',
            '2.4我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本隐私政策 所述目的所需的期限内保留您的个人信息，除非需要延长保留期或法律要求。',
            '3.安全事件处置',
            '3.1我们将尽力确保您发送给我们的任何信息的安全性，为防止安全事故的发生， 我们制定了妥善的预警机制和应急预案，明确安全事件、安全漏洞的分类分级标准及相应的处理流程。安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议和对您的补救措施，并立即启动应急预案，力求将损失最小化。我们将及时将事件相关情况以电话、推送通知等方式告知您，难以逐一告知用户时，我们会采取合理、有效的方式发布公告。',
            '（二）个人信息的保存',
            '1.您的个人信息我们将保存至您账号注销之日，但服务信息、交易信息保存时间为自交易完成之日起三年，但法律、行政法规另有规定的，依照其规定。当您的个人信息超出我们所保存的期限后，我们会对您的个人信息进行删除或匿名化处理。',
            '2.如果我们终止服务或运营，我们会至少提前三十日向您通知，并在终止服务或运营后对您的 个人信息进行删除或匿名化处理。',
            '（三）您的理解与配合',
            '1.我们非常重视个人信息安全，并采取一切合理可行的措施，保护您的个人信息，但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，不可能始终保证信息百分之百的安全。 您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。',
            '2.请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如果您对我们的个人信息保护有任何疑问，可通过本隐私政策最下方约定的联系方式联系我们。如您发现自己的个人信息泄密，尤其是您的账户及密码发生泄露，请您立即通过本政策最下方 【如何联系我们】约定的联系方式联系我们，以便我们采取相应措施。',
            '六、您如何管理您的个人信息',
            '停车线非常重视您对个人信息的关注，并尽全力保护您对于个人信息访问、更正、删除以及撤回，同意的权利，以使您拥有充分的能力保障您的隐私和安全；在您访问、修改和删除相关信息时，我们可能会要求您进行身份验证，以保障账号的安全。',
            '1.除法律法规规定外，您有权随时访问和更正您的个人信息，具体包括：',
            '1.1账户信息：账户名称、个人资料信息可通过“个人中心”查看、修改车辆信息。',
            '1.2对于您在使用我们的产品/或服务过程中产生的其他个人信息需要访问或更正，请随时联系我们。 我们会根据本隐私政策所列明的方式和期限响应您的请求。',
            '1.3您无法访问和更正的个人信息：除上述列明的信息外，您的部分个人信息我们还无法为您提供访问和更正的服务，这些信息主要是为了提升您的用户体验和保证交易安全所收集的您的设备信息、您使用附加功能时产生的个人信息。',
            '上述信息我们会在您授权范围内进行使用，您无法访问和更正，但您可联系我们进行删除或做匿名化处理。',
            '2．删除您的个人信息',
            '您在我们相关页面中可以直接编辑、清除或删除的信息，包括账单信息、浏览信息、车辆信息。 在以下情形中，您可以联系我们，向我们提出删除个人信息的请求（当您从我们的服务中删除信息后，我们可能不会立即在备份系统中删除相应的信息，但会在备份 更新时删除这些信息。但法律法规规定要求我们必须尽到保存、记录、备份等情形除外）：',
            '2.1我们违反法律法规规定或与您的约定，收集、使用个人信息的；',
            '2.2我们违反法律法规规定或与您的约定，向第三方共享、转让个人信息的；',
            '2.3我们违反法律法规规定或与您的约定，公开披露个人信息的。',
            '3．改变您授权同意的范围或撤回您的授权',
            '3.1您可以通过删除信息、关闭设备功能，在停车线中进行设置等方式改变您授权我们继续收集个人信息的范围或撤回您的授权。您也可以通过注销账户的方式，撤回我们继续收集您个人信息的全部授权。',
            '3.2请您理解，每个业务功能需要一些基本的个人信息才能得以完成，当您撤回同意或授权后，我们无法继续为您提供撤回同意或授权所对应的服务，也不再处理您相应的个人信息。但你能撤回同意或授权的决定，不会影响此前给予您的授权而开展的个人信息处理。',
            '4.获取个人信息副本\n' +
            '您有权获取您的个人信息副本，您可以通过联系客服联系我们， 我们将在15天内对您的请求进行处理。',
            '5.为了保护您的隐私，我们不会以任何方式和途径向您推送涉及宗教信仰、疾病等相关敏感内容的促销或商品信息给您，如果您不想接受我们给您发送的除前述内容之外的促销信息，您随时可通过回复“TD”来取消我们给您发送的手机营销短信。',
            '6.响应您的请求',
            '6.1为了保障安全，我们可能需要您提供书面请求，或以其他方式证明您的身份，我们将在收到您反馈并验证您的身份后的15天内答复您的请求。对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情况收取一定的成本费用。对于那些与您的身份不直接关联的信息、 无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来 风险或者非常不切实际的请求，我们可能会予以拒绝。',
            '6.2 在以下情形中，按照法律法规要求，我们将无法响应您的请求：',
            '6.2.1 与国家安全、国防安全直接相关的；',
            '6.2.2 与公共安全、公共卫生、重大公共利益直接相关的；',
            '6.2.3 与犯罪侦查、起诉、审判和判决执行等直接相关的；',
            '6.2.4 有充分证据表明您存在主观恶意或滥用权力的；',
            '6.2.5 响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；',
            '6.2.6 涉及商业秘密的。',
            '七、未成年人信息保护',
            '停车线非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用停车线服务前，应事先取得您家长或法定监护人的书面同意。停车线根据国家相关法律法规的规定保护未成年人的个人信息。',
            '八、通知和修订',
            '1.为给您提供更好的服务以及随着停车线业务的发展，本隐私政策也会随之更新。但未经您明确同意， 我们不会削减您依据本隐私政策所应享有的权利。我们会通过在停车线小程序发出更新信息并在生效前7日通过网站公告或以其他适当 方式提醒您相关内容的更新，也请您访问停车线以便及时了解最新的隐私政策。',
            '2.对于重大变更，我们还会提供更为显著的通知（包括但不限于邮件、短信或在浏览页面做特别提示或弹窗等方式，说明隐私政策的具体变更内容，本政策所指的重大变更包括但不限于：',
            '2.1我们的服务模式发生重大变化，如处理个人信息的目的、类型、使用方式等变更；',
            '2.2我们在所有权结构、组织架构等方面发生重大变化，如业务调整、破产并购等引起的所有者变更等；',
            '2.3个人信息共享、转让或公开披露的主要对象发生重大变化；',
            '2.4您参与个人信息处理方面的权利及其行使方式发生重大变化；',
            '2.5我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；',
            '2.6个人信息安全影响评估报告表明存在高风险时。',
            '九、如何联系我们',
            '如您对本隐私政策或您个人信息的相关事宜有任何问题、意见或建议，发送邮件至tcx@keliankeji.mobi 或拨打我们客服电话0772-2600865等多种方式与我们联系',
            '十、附录',
            '本隐私政策中使用的特定词语，具有如下含义：',
            '1.“我们”或“停车线”指广西科联科技有限公司。',
            '2.“您”指使用我们的产品和服务的注册用户或非注册用户。',
            '3.“停车线关联方、合作方”指我们的关联公司、投资公司、联盟成员、合作伙伴以及其他受信任的第三方供应商、服务商及代理商。',
            '4.“个人信息”，指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。个人信息包括个人基本信息、个人身份信息、 个人生物识别信息、网络身份标识信息、个人健康生理信息、个人教育工作信息、个人财产信息、 个人通信信息、联系人信息、个人上网记录、个人常用设备信息、个人位置信息等。为免疑义，个人信息包括但不限于个人敏感信息。',
            '5.“个人敏感信息”指一旦泄露、非法提供或滥用可能危害人身和财产安全，极易导致个人名誉、 身心健康受到损害或歧视性待遇等的个人信息。个人敏感信息包括个人财产信息、个人健康生理信息、 个人生物识别信息、个人身份信息、网络身份标识信息等。',
            '6.“去标识化”指通过对个人信息的技术处理，使其在不借助额外信息的情况下，无法识别个人信息 主体的过程。',
            '7.“匿名化”指通过对个人信息的技术处理，使得个人信息主体无法被识别，且处理后的信息 不能被复原的过程。',
            ''
          ]
        })
        break
    }
  }
})