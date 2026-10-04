const articles = [
    {
        id: "password-reset",
        title: "Reset a user password",
        category: "Accounts",
        priority: "High",
        summary: "Restore user access after a forgotten password or lockout.",
        icon: "ID",
        symptoms: [
            "User cannot sign in after multiple attempts.",
            "Account shows locked or password expired.",
            "User recently changed devices or returned from leave."
        ],
        steps: [
            "Verify the user's identity using the approved company process.",
            "Check whether the account is locked, disabled, or expired.",
            "Reset the password or unlock the account in the admin console.",
            "Require password change at next login when appropriate.",
            "Ask the user to test login before closing the ticket."
        ],
        escalation: "Escalate if the account repeatedly locks after reset or if suspicious login activity appears."
    },
    {
        id: "vpn-connectivity",
        title: "Troubleshoot VPN connection failures",
        category: "Networking",
        priority: "High",
        summary: "Diagnose common remote access issues for VPN users.",
        icon: "VPN",
        symptoms: [
            "VPN client times out or refuses credentials.",
            "User has internet access but cannot reach internal systems.",
            "Connection drops after a few minutes."
        ],
        steps: [
            "Confirm the user has working internet before opening the VPN client.",
            "Check username, password, MFA approval, and account status.",
            "Ask the user to restart the VPN client and try a different network.",
            "Confirm the VPN service status and check for known outages.",
            "Record the exact error message and timestamp in the ticket."
        ],
        escalation: "Escalate to network support if multiple users report the issue or logs show authentication gateway errors."
    },
    {
        id: "printer-offline",
        title: "Bring an offline printer back online",
        category: "Hardware",
        priority: "Medium",
        summary: "Resolve printer offline reports before replacing hardware.",
        icon: "PRN",
        symptoms: [
            "Printer appears offline in Windows.",
            "Print jobs stay stuck in the queue.",
            "Other users can print but one user cannot."
        ],
        steps: [
            "Confirm the printer has power, paper, toner, and no visible error lights.",
            "Check network or USB connection depending on the printer setup.",
            "Clear stuck jobs from the print queue.",
            "Restart the print spooler or reboot the printer if needed.",
            "Print a test page and document the result."
        ],
        escalation: "Escalate if the printer cannot obtain an IP address or reports a hardware fault code."
    },
    {
        id: "slow-computer",
        title: "Investigate a slow workstation",
        category: "Hardware",
        priority: "Medium",
        summary: "Check common causes of poor workstation performance.",
        icon: "PC",
        symptoms: [
            "Applications take a long time to open.",
            "System freezes during normal work.",
            "User reports high fan noise or frequent restarts."
        ],
        steps: [
            "Check CPU, memory, disk, and startup apps in Task Manager.",
            "Restart the workstation if uptime is unusually high.",
            "Confirm available disk space and remove unnecessary temporary files.",
            "Run updates and check for failed patches.",
            "Scan for malware or unwanted software if behavior is unusual."
        ],
        escalation: "Escalate if hardware diagnostics fail or performance remains poor after cleanup."
    },
    {
        id: "email-profile",
        title: "Repair an email profile issue",
        category: "Software",
        priority: "Medium",
        summary: "Fix common Outlook or mail client profile problems.",
        icon: "MAIL",
        symptoms: [
            "Email client opens slowly or will not open.",
            "Mailbox does not sync new messages.",
            "User repeatedly receives credential prompts."
        ],
        steps: [
            "Confirm webmail works to separate mailbox issues from client issues.",
            "Check network access and account status.",
            "Restart the mail client and review any visible error messages.",
            "Rebuild or recreate the local mail profile if sync remains broken.",
            "Confirm the user can send, receive, and search mail."
        ],
        escalation: "Escalate if webmail is also unavailable or multiple users report mailbox access problems."
    },
    {
        id: "phishing-report",
        title: "Handle a suspected phishing email",
        category: "Security",
        priority: "High",
        summary: "Triage suspicious email reports and reduce account risk.",
        icon: "SEC",
        symptoms: [
            "User received a suspicious link or attachment.",
            "Message asks for credentials, payment, or urgent action.",
            "User clicked a link or entered information."
        ],
        steps: [
            "Instruct the user not to click links, open attachments, or forward the message.",
            "Collect sender, subject, timestamp, and screenshots if allowed.",
            "Submit the message through the approved phishing report process.",
            "If the user clicked or entered credentials, reset the password immediately.",
            "Document actions taken and notify security according to policy."
        ],
        escalation: "Escalate immediately if credentials were entered, malware opened, or multiple users received the same message."
    },
    {
        id: "software-install",
        title: "Process a software install request",
        category: "Software",
        priority: "Low",
        summary: "Review and complete a standard software request.",
        icon: "APP",
        symptoms: [
            "User needs approved software installed.",
            "Application is missing after device replacement.",
            "License or approval status is unclear."
        ],
        steps: [
            "Confirm the software name, business need, and device information.",
            "Verify license availability and manager approval if required.",
            "Install from the approved software portal or deployment tool.",
            "Launch the application and confirm the user can sign in.",
            "Record software name, version, and device in the ticket."
        ],
        escalation: "Escalate if licensing is unavailable or the application requires administrator packaging."
    },
    {
        id: "wifi-issue",
        title: "Resolve Wi-Fi access problems",
        category: "Networking",
        priority: "Medium",
        summary: "Troubleshoot wireless connectivity for laptops and mobile users.",
        icon: "WIFI",
        symptoms: [
            "Device cannot see the corporate Wi-Fi network.",
            "Wi-Fi connects but has no internet access.",
            "Connection drops in one office area."
        ],
        steps: [
            "Confirm whether other users in the same area are affected.",
            "Forget and reconnect to the approved wireless network.",
            "Check airplane mode, Wi-Fi adapter status, and saved credentials.",
            "Restart the device and test another known working network.",
            "Capture location, device name, and time of failure."
        ],
        escalation: "Escalate if the issue appears location-wide or multiple devices fail in the same area."
    }
];

const articleList = document.querySelector("#articleList");
const articleDetail = document.querySelector("#articleDetail");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const articleCount = document.querySelector("#articleCount");
const categoryButtons = document.querySelectorAll(".category-button");
const quickCards = document.querySelectorAll(".quick-card");

let selectedCategory = "All";
let selectedArticleId = articles[0].id;

articleCount.textContent = articles.length;

function getFilteredArticles() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    return articles.filter((article) => {
        const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
        const searchableText = [
            article.title,
            article.category,
            article.priority,
            article.summary,
            ...article.symptoms,
            ...article.steps
        ].join(" ").toLowerCase();

        return matchesCategory && searchableText.includes(searchTerm);
    });
}

function renderArticleList() {
    const filteredArticles = getFilteredArticles();
    resultCount.textContent = `${filteredArticles.length} result${filteredArticles.length === 1 ? "" : "s"}`;
    articleList.innerHTML = "";

    if (filteredArticles.length === 0) {
        articleList.innerHTML = '<p class="empty-state">No matching articles found.</p>';
        articleDetail.innerHTML = '<p class="empty-state">Try another search term or category.</p>';
        return;
    }

    if (!filteredArticles.some((article) => article.id === selectedArticleId)) {
        selectedArticleId = filteredArticles[0].id;
    }

    filteredArticles.forEach((article) => {
        const button = document.createElement("button");
        button.className = `article-button${article.id === selectedArticleId ? " active" : ""}`;
        button.type = "button";
        button.dataset.articleId = article.id;
        button.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <div class="meta-row">
                <span class="tag">${article.category}</span>
                <span class="priority ${article.priority.toLowerCase()}">${article.priority}</span>
            </div>
        `;

        button.addEventListener("click", () => {
            selectedArticleId = article.id;
            renderArticleList();
            renderArticleDetail();
        });

        articleList.appendChild(button);
    });

    renderArticleDetail();
}

function renderArticleDetail() {
    const article = articles.find((item) => item.id === selectedArticleId);

    if (!article) {
        articleDetail.innerHTML = '<p class="empty-state">Select an article to view details.</p>';
        return;
    }

    articleDetail.innerHTML = `
        <div class="detail-header">
            <div>
                <div class="meta-row">
                    <span class="tag">${article.category}</span>
                    <span class="priority ${article.priority.toLowerCase()}">${article.priority}</span>
                </div>
                <h2>${article.title}</h2>
                <p>${article.summary}</p>
            </div>
            <span class="detail-icon" aria-hidden="true">${article.icon}</span>
        </div>

        <section class="detail-section">
            <h3>Symptoms</h3>
            <ul class="check-list">
                ${article.symptoms.map((symptom) => `<li>${symptom}</li>`).join("")}
            </ul>
        </section>

        <section class="detail-section">
            <h3>Resolution Steps</h3>
            <ol class="step-list">
                ${article.steps.map((step) => `<li>${step}</li>`).join("")}
            </ol>
        </section>

        <section class="detail-section">
            <h3>Escalation Note</h3>
            <p>${article.escalation}</p>
        </section>
    `;
}

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        categoryButtons.forEach((categoryButton) => {
            categoryButton.classList.toggle("active", categoryButton === button);
        });

        renderArticleList();
    });
});

quickCards.forEach((card) => {
    card.addEventListener("click", () => {
        selectedCategory = "All";
        searchInput.value = card.dataset.quickSearch;

        categoryButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.category === "All");
        });

        renderArticleList();
    });
});

searchInput.addEventListener("input", renderArticleList);

renderArticleList();
